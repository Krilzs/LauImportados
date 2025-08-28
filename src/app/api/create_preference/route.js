import { MercadoPagoConfig, Preference } from "mercadopago";

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN,
});

export async function POST(request) {
  try {
    const { items } = await request.json();

    const preference = new Preference(client);

    // ⚠️ IMPORTANTE: usar body
    const response = await preference.create({
      body: {
        items: items.map((item) => ({
          id: item.id,
          title: item.name,
          quantity: Number(item.quantity),
          unit_price: Number(item.price),
        })),
        back_urls: {
          success: "https://lau-importados.vercel.app/success",
          failure: "https://lau-importados.vercel.app/failure",
          pending: "https://lau-importados.vercel.app/pending",
        },
        auto_return: "approved",
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
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
