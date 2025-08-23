import { MercadoPagoConfig, Preference } from "mercadopago";

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN,
});

export async function POST(request) {
  try {
    const { items, buyer } = await request.json();

    console.log(buyer);

    const preference = new Preference(client);

    // ⚠️ IMPORTANTE: usar body
    const response = await preference.create({
      body: {
        items: items.map((item) => ({
          title: item.name,
          quantity: Number(item.quantity),
          unit_price: Number(item.price),
        })),
        back_urls: {
          success: "http://localhost:3000/success",
          failure: "http://localhost:3000/failure",
          pending: "http://localhost:3000/pending",
        },
        auto_return: "",
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
