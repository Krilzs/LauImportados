import { MercadoPagoConfig, Preference } from "mercadopago";
import { supabase } from "@/lib/supabaseClient";
import crypto from "crypto";

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN,
});

export async function POST(request) {
  try {
    const { items, buyerData } = await request.json();
    const preference = new Preference(client);

    // 1. Generar external_reference único
    const external_reference = crypto.randomUUID();

    // 2. Guardar orden preliminar en Supabase
    const { data, error } = await supabase
      .from("pedidos")
      .insert([
        {
          external_reference,
          status: "pending",
          buyer_first_name: buyerData.firstName,
          buyer_last_name: buyerData.lastName,
          delivery_point: buyerData.deliveryPoint,
          carrito: items, // guardar JSON del carrito
          created_at: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    if (error) throw new Error(error.message);

    // 3. Crear preferencia en Mercado Pago
    const response = await preference.create({
      body: {
        items: items.map((item) => ({
          id: item.id,
          title: item.name,
          quantity: Number(item.quantity),
          unit_price: Number(item.price),
        })),
        back_urls: {
          success: "https://lauimportados.shop/success",
          failure: "https://lauimportados.shop/failure",
          pending: "https://lauimportados.shop/pending",
        },
        auto_return: "approved",
        external_reference, // 👈 clave para unir con tu DB
      },
    });

    return new Response(JSON.stringify({ init_point: response.init_point }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("❌ Error creando preferencia:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Error creando preferencia" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
