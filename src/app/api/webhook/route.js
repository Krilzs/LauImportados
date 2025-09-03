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

async function updateStockFromCarrito(carrito) {
  for (const item of carrito) {
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
  }
}

// --- Handler Principal ---
export async function POST(req) {
  try {
    const body = await req.json();

    // Solo atender webhook de merchant_order
    if (body.type !== "topic_merchant_order_wh") {
      return NextResponse.json({ status: "ignored" });
    }

    console.info("🔔 Webhook recibido");
    const merchantOrder = await getMerchantOrder(body.id);
    const paymentId = merchantOrder.payments[0]?.id;
    if (!paymentId) {
      console.warn("⚠️ Webhook sin paymentId válido");
      return NextResponse.json({ status: "no_payment" });
    }

    const payment = await getPayment(paymentId);
    const payer_information = payment.payer;
    const external_reference = payment.external_reference;

    // Buscar orden en Supabase
    const { data: existingOrder, error: orderError } = await supabase
      .from("pedidos")
      .select("*")
      .eq("external_reference", external_reference)
      .maybeSingle();

    if (orderError) throw new Error(orderError.message);
    if (!existingOrder) {
      console.error("❌ Orden no encontrada en Supabase");
      return NextResponse.json({ status: "order_not_found" });
    }

    // Idempotencia → si ya estaba aprobado, ignorar
    if (existingOrder.status === "closed") {
      console.log("⚠️ Pedido ya aprobado, ignorando webhook");
      return NextResponse.json({ status: "already_processed" });
    }

    // Calcular total desde carrito
    const totalAmount = existingOrder.carrito.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    // Actualizar la orden con estado aprobado y datos de pago
    const { error: updateError } = await supabase
      .from("pedidos")
      .update({
        status: merchantOrder.status,
        user_email: payer_information.email,
        id_pedido_mp: merchantOrder.id,
        total_amount: totalAmount,
        updated_at: new Date().toISOString(),
      })
      .eq("external_reference", external_reference);

    if (updateError) throw new Error(updateError.message);

    // Actualizar stock usando carrito JSON
    await updateStockFromCarrito(existingOrder.carrito);

    console.log(`✅ Pedido ${existingOrder.id} actualizado con éxito`);
    return NextResponse.json({ status: "success" });
  } catch (error) {
    console.error("🔥 Webhook error:", error);
    return NextResponse.json(
      { error: "Webhook error", detail: error.message },
      { status: 500 }
    );
  }
}
