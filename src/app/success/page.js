// /app/success/page.js
"use client";
import { useEffect, useState } from "react";

export default function SuccessPage({ searchParams }) {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchPayment = async () => {
      const paymentId = searchParams.payment_id; // viene de MP

      // Consultamos a nuestra API interna
      const res = await fetch(`/api/payment/${paymentId}`);
      const data = await res.json();
      setOrder(data);
    };

    fetchPayment();
  }, [searchParams]);

  if (!order) return <p>Cargando compra...</p>;

  return (
    <div>
      <h1>¡Gracias por tu compra!</h1>
      <p>Comprador: {order.payer?.email}</p>
      <ul>
        {order.items.map((item) => (
          <li key={item.id}>
            {item.title} x {item.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
}
