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
    const { data: product, error: productError } = await supabase
      .from("productos")
      .select("stock")
      .eq("id", item.id)
      .single();

    if (productError) {
      console.error(`❌ Error fetching product ${item.id}:`, productError);
      continue;
    }

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

// --- Nuevo: helper para enviar mail ---
async function sendEmail(email, items) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/sendEmail`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, items }),
      }
    );

    if (!res.ok) {
      const err = await res.text();
      console.error("❌ Error enviando email:", err);
    } else {
      console.log("📧 Email enviado correctamente");
    }
  } catch (err) {
    console.error("🔥 Error sendEmail:", err);
  }
}

// --- Handler Principal ---
export async function POST(req) {
  try {
    const body = await req.json();

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

    // Idempotencia
    if (existingOrder.status === "closed") {
      console.log("⚠️ Pedido ya aprobado, ignorando webhook");
      return NextResponse.json({ status: "already_processed" });
    }

    const totalAmount = existingOrder.carrito.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    // Actualizar orden
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

    // Actualizar stock
    await updateStockFromCarrito(existingOrder.carrito);

    // Enviar mail de confirmación ✅
    await sendEmail(payer_information.email, existingOrder.carrito);

    console.log(`✅ Pedido ${existingOrder.id} actualizado y mail enviado`);
    return NextResponse.json({ status: "success" });
  } catch (error) {
    console.error("🔥 Webhook error:", error);
    return NextResponse.json(
      { error: "Webhook error", detail: error.message },
      { status: 500 }
    );
  }
}
