// app/api/webhook/route.js
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function POST(req) {
  try {
    const body = await req.json();

    // Only handle MercadoPago merchant order webhook
    if (body.type !== "topic_merchant_order_wh") {
      return NextResponse.json({ status: "ignored" });
    }

    const orderId = body.id;

    // STEP 1 Fetch merchant order data from MercadoPago
    const orderRes = await fetch(
      `https://api.mercadopago.com/merchant_orders/${orderId}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`,
        },
      }
    );
    const orderData = await orderRes.json();
    const items = orderData.items;

    // STEP 2 Get payment and buyer info
    const paymentId = orderData.payments[0]?.id;
    const paymentRes = await fetch(
      `https://api.mercadopago.com/v1/payments/${paymentId}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`,
        },
      }
    );
    const paymentData = await paymentRes.json();
    const buyer = paymentData.payer;

    // STEP 3 Insert new order in `pedidos`
    const totalAmount = items.reduce(
      (acc, item) => acc + item.unit_price * item.quantity,
      0
    );

    const { data: pedido, error: pedidoError } = await supabase
      .from("pedidos")
      .insert([
        {
          status: orderData.status,
          total_amount: totalAmount,
          user_email: buyer.email,
          created_at: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    if (pedidoError) {
      console.error("❌ Error creating order:", pedidoError);
      return NextResponse.json(
        { error: "Error creating order" },
        { status: 500 }
      );
    }

    const pedidoId = pedido.id;

    // STEP 4 Process each item: update stock & save in `pedido_items`
    for (const item of items) {
      console.log("Item a MODIFICAR: ", item);
      // a. Fetch product stock
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

      // b. Update stock
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

      // c. Insert item in `pedido_items`
      const { error: itemError } = await supabase.from("pedido_items").insert([
        {
          pedido_id: pedidoId,
          producto_id: item.id,
          quantity: item.quantity,
          price: item.unit_price,
        },
      ]);

      if (itemError) {
        console.error(
          `❌ Error inserting item ${item.id} into pedido_items:`,
          itemError
        );
      }
    }

    console.log(`✅ Pedido ${pedidoId} created with ${items.length} items`);
    return NextResponse.json({ status: "success" });
  } catch (error) {
    console.error("🔥 Webhook error:", error);
    return NextResponse.json({ error: "Webhook error" }, { status: 500 });
  }
}
