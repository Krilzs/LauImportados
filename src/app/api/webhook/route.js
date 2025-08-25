// app/api/webhook/route.js
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function POST(req) {
  try {
    const body = await req.json();

    // Mercado Pago te avisa el tipo de notificación
    if (body.type === "payment") {
      const paymentId = body.data.id;

      console.log(paymentId);

      // Consultamos a MP para traer los datos completos
      const res = await fetch(
        `https://api.mercadopago.com/v1/payments/${paymentId}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`, // tu token privado
          },
        }
      );

      const data = await res.json();
      console.log("Pago obtenido:", data);

      // 👉 Aquí ya podés actualizar Supabase con la info de la compra

      const items = data.additional_info.items;
      for (const item of items) {
        await supabase
          .from("productos")
          .update({ stock: supabase.raw(`stock - ${item.quantity}`) })
          .eq("id", item.id);
      }

      return NextResponse.json({ status: "success" });
    }

    return NextResponse.json({ status: "ignored" });
  } catch (error) {
    console.error("Error en webhook:", error);
    return NextResponse.json({ error: "Webhook error" }, { status: 500 });
  }
}
