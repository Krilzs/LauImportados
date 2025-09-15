"use client";

import { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { clearCart } from "@/store/cartSlice";
import { FaCheckCircle } from "react-icons/fa";
import Link from "next/link";

export default function SuccessClient({ order }) {
  const dispatch = useDispatch();

  // Limpiamos carrito al montar
  useEffect(() => {
    dispatch(clearCart());
  }, [dispatch]);

  // 🟢 Generar link de WhatsApp
  const whatsappUrl = useMemo(() => {
    if (!order) return "#";

    const phone = "5491170656865"; // <-- acá va el número del vendedor en formato internacional sin "+"
    const total = order.items.reduce(
      (acc, item) => acc + item.unit_price * item.quantity,
      0
    );

    let message = `¡Hola! Soy el cliente con email ${order.payer?.email}.
Quiero confirmar mi pedido #${order.id}.
  
Productos: 
${order.items
  .map(
    (item) =>
      `- ${item.title} x${item.quantity} = $${(
        item.unit_price * item.quantity
      ).toLocaleString("es-AR")}`
  )
  .join("\n")}

Total: $${total.toLocaleString("es-AR")}`;

    return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  }, [order]);

  if (!order) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-600 text-lg animate-pulse">
          Procesando compra...
        </p>
      </div>
    );
  }

  if (!order.items || order.items.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-600 text-lg">
          Sin productos en la orden de compra.
        </p>
      </div>
    );
  }

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

        {/* Botones */}
        <div className="flex flex-col space-y-3">
          <Link
            href="/tienda"
            className="inline-block bg-green-500 text-white px-6 py-3 rounded-xl shadow hover:bg-green-600 transition"
          >
            Volver a la tienda
          </Link>

          {/* 🟢 Botón de WhatsApp */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#25D366] text-white px-6 py-3 rounded-xl shadow hover:bg-[#1ebe5c] transition"
          >
            Confirmar pedido por WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
