// app/api/webhook/route.js
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

// --- Helpers ---
async function getMerchantOrder(orderId) {
  const res = await fetch(
    `https://api.mercadopago.com/merchant_orders/${orderId}`,
    {
      headers: { Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}` },
    }
  );
  return res.json();
}

async function getPayment(paymentId) {
  const res = await fetch(
    `https://api.mercadopago.com/v1/payments/${paymentId}`,
    {
      headers: { Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}` },
    }
  );
  return res.json();
}

async function createPedido(merchantOrder, payer_information, items) {
  const totalAmount = items.reduce(
    (acc, item) => acc + item.unit_price * item.quantity,
    0
  );

  const { data, error } = await supabase
    .from("pedidos")
    .insert([
      {
        status: merchantOrder.status,
        total_amount: totalAmount,
        user_email: payer_information.email,
        created_at: new Date().toISOString(),
        id_pedido_mp: merchantOrder.id, // 👈 idempotencia
      },
    ])
    .select()
    .single();

  if (error) throw new Error(`Error creating pedido: ${error.message}`);
  return data;
}

async function processItems(pedidoId, items) {
  for (const item of items) {
    // 1. Obtener stock actual
    const { data: product, error: productError } = await supabase
      .from("productos")
      .select("stock")
      .eq("id", item.id)
      .single();

    if (productError) {
      console.error(`❌ Error fetching product ${item.id}:`, productError);
      continue;
    }

    // 2. Actualizar stock
    const newStock = product.stock - item.quantity;
    const { error: stockError } = await supabase
      .from("productos")
      .update({ stock: newStock })
      .eq("id", item.id);

    if (stockError) {
      console.error(
        `❌ Error updating stock for product ${item.id}:`,
        stockError
      );
    }

    // 3. Insertar en pedido_items
    const { error: itemError } = await supabase.from("pedido_items").insert([
      {
        pedido_id: pedidoId,
        producto_id: item.id,
        quantity: item.quantity,
        price: item.unit_price,
      },
    ]);

    if (itemError) {
      console.error(`❌ Error inserting item ${item.id}:`, itemError);
    }
  }
}

//  Handler Principal
export async function POST(req) {
  try {
    const body = await req.json();

    // Solo atender webhook de merchant_order
    if (body.type !== "topic_merchant_order_wh") {
      return NextResponse.json({ status: "ignored" });
    }

    const merchantOrder = await getMerchantOrder(body.id);
    const items = merchantOrder.items;

    // Idempotencia → evitar pedidos duplicados
    const { data: existing } = await supabase
      .from("pedidos")
      .select("id")
      .eq("id_pedido_mp", merchantOrder.id)
      .maybeSingle();

    if (existing) {
      console.log("⚠️ Pedido ya procesado, ignorando webhook");
      return NextResponse.json({ status: "already_processed" });
    }

    // Obtener info del comprador
    const paymentId = merchantOrder.payments[0]?.id;
    const payment = await getPayment(paymentId);
    const payer_information = payment.payer;

    // Crear pedido + procesar items
    const pedido = await createPedido(merchantOrder, payer_information, items);
    await processItems(pedido.id, items);

    console.log(`✅ Pedido ${pedido.id} creado con ${items.length} items`);
    return NextResponse.json({ status: "success" });
  } catch (error) {
    console.error("🔥 Webhook error:", error);
    return NextResponse.json(
      { error: "Webhook error", detail: error.message },
      { status: 500 }
    );
  }
}
