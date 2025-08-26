// app/api/payment/[id]/route.js
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { id } = await params;

  try {
    // 1. Consultar el payment
    const resPayment = await fetch(
      `https://api.mercadopago.com/v1/payments/${id}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`,
        },
      }
    );

    const payment = await resPayment.json();

    // 2. Con el merchant_order_id traemos los items
    const resOrder = await fetch(
      `https://api.mercadopago.com/merchant_orders/${payment.order.id}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`,
        },
      }
    );

    const merchantOrder = await resOrder.json();

    return NextResponse.json({
      payer: payment.payer,
      status: payment.status,
      items: merchantOrder.items, // 👈 aquí sí vienen los productos
    });
  } catch (error) {
    console.error("Error obteniendo pago:", error);
    return NextResponse.json(
      { error: "Error al obtener pago" },
      { status: 500 }
    );
  }
}
