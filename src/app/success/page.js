"use client";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { clearCart } from "@/store/cartSlice";
import { FaCheckCircle } from "react-icons/fa";
import Link from "next/link";

export default function SuccessPage({ searchParams }) {
  const [order, setOrder] = useState(null);
  const dispatch = useDispatch();

  console.log(order);

  useEffect(() => {
    const fetchPayment = async () => {
      const { payment_id: paymentId } = await searchParams;
      console.log(paymentId);



      const res = await fetch(`/api/payment/${paymentId}`);
      const data = await res.json();
      setOrder(data);

      // 🧹 Limpiamos el carrito de Redux
      dispatch(clearCart());
    };

    fetchPayment();
  }, [searchParams, dispatch]);

  const sendEmail = async (email, items) => {
    const bodyinfo = {
      email: email,
      items: items,
    };

    const res = await fetch(`/api/sendEmail`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyinfo),
    });

    const data = await res.json();
  };

  if (!order) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-600 text-lg animate-pulse">
          Procesando compra...
        </p>
      </div>
    );
  } else if (!order.items) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-600 text-lg ">
          Sin productos en la orden de compra.
        </p>
      </div>
    );
  } else {
    sendEmail(order.payer?.email, order.items);
    return (
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="bg-white shadow-lg rounded-2xl p-8 max-w-lg w-full text-center">
          {/* Ícono de éxito */}
          <FaCheckCircle className="mx-auto text-green-500 w-16 h-16 mb-4" />

          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            ¡Gracias por tu compra!
          </h1>
          <p className="text-gray-600 mb-6">
            Tu pago fue procesado exitosamente. Te enviamos un comprobante a{" "}
            <span className="font-medium">{order.payer?.email}</span>.
          </p>

          {/* Resumen de productos */}
          <div className="bg-gray-50 rounded-xl p-4 mb-6 text-left">
            <h2 className="text-lg font-semibold text-gray-700 mb-3">
              Resumen de tu pedido
            </h2>
            <ul className="space-y-2">
              {order.items.map((item) => (
                <li
                  key={item.id}
                  className="flex justify-between text-gray-700 text-sm"
                >
                  <span>
                    {item.title}{" "}
                    <span className="text-gray-500">x{item.quantity}</span>
                  </span>
                  <span className="font-medium">
                    ${(item.unit_price * item.quantity).toLocaleString("es-AR")}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Botón de volver */}
          <Link
            href="/tienda"
            className="inline-block bg-green-500 text-white px-6 py-3 rounded-xl shadow hover:bg-green-600 transition"
          >
            Volver a la tienda
          </Link>
        </div>
      </div>
    );
  }
}
