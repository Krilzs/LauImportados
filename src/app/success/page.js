import SuccessClient from "./SuccesPage";
export const metadata = {
  title: "Pago Exitoso | Lau Importados",
};

export default async function Page({ searchParams }) {
  const paymentId = await searchParams?.payment_id;

  if (!paymentId) {
    return <div>No se encontró el Payment ID</div>;
  }

  // Llamada directa a la API de Mercado Pago (SSR)
  const res = await fetch(
    `https://api.mercadopago.com/v1/payments/${paymentId}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`, // usa tu access token
      },
      cache: "no-store", // evita cache en SSR
    }
  );

  if (!res.ok) {
    return <div>Error obteniendo los datos del pago</div>;
  }

  const paymentData = await res.json();

  // 🔑 Adaptás la respuesta de Mercado Pago a lo que espera tu componente
  const order = {
    id: paymentData.id,
    status: paymentData.status,
    payer: {
      email: paymentData.payer?.email,
    },
    items: paymentData.additional_info?.items || [],
  };

  return <SuccessClient order={order} />;
}
