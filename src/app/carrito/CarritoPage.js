"use client";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";
import { removeFromCart, updateQuantity } from "@/store/cartSlice";
import { FaTrash } from "react-icons/fa";
import WhatsAppButton from "@/components/carrito/WhatsAppButton";
import { useRouter } from "next/navigation";

export const metadata = {
  title: "Carrito de Compras | Lau Importados",
};

const CarritoPage = () => {
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const totalPrice = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // Manejo de cambios en inputs del formulario
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Checkout con datos del comprador
  const handleCheckout = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/create_preference", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: items }),
      });

      const data = await res.json();
      window.location.href = data.init_point;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold text-gray-700">Cargando</h1>
      </div>
    );

  if (items.length === 0)
    return (
      <div className="min-h-[80vh] mt-35 flex items-center justify-center">
        <h1 className="text-2xl font-bold text-gray-700">
          Tu carrito está vacío
        </h1>
      </div>
    );

  return (
    <div className="min-h-[80vh] mt-35 px-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Carrito de Compras</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Columna izquierda → Carrito */}
        <div className="md:col-span-2 flex flex-col gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex flex-col md:flex-row items-center bg-white p-4 rounded-lg shadow-md"
            >
              <div className="w-full md:w-1/4 flex justify-center mb-4 md:mb-0">
                <Image
                  src={item.image}
                  width={150}
                  height={150}
                  alt={item.name}
                  className="rounded-md object-contain"
                />
              </div>

              <div className="flex-1 flex flex-col w-full md:w-2/4 justify-center gap-2 md:ml-6">
                <h2 className="text-xl font-bold">{item.name}</h2>
                <p className="text-gray-600">${item.price} c/u</p>

                {/* Input para modificar cantidad */}
                <div className="flex items-center gap-2">
                  <label className="text-gray-600">Cantidad:</label>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                      dispatch(
                        updateQuantity({
                          id: item.id,
                          quantity: Number(e.target.value),
                        })
                      )
                    }
                    className="w-16 border rounded px-2 py-1"
                  />
                </div>
              </div>

              <div className="mt-4 md:mt-0 md:ml-6 flex  items-center gap-2 font-bold text-gray-800">
                <p> Subtotal: ${item.price * item.quantity}</p>
                <button
                  onClick={() => dispatch(removeFromCart(item.id))}
                  className=" text-white px-3 py-1 rounded hover:bg-red-200 transition duration-300 ease-in-out"
                >
                  <FaTrash className="text-xl text-red-400 cursor-pointer" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Columna derecha → Formulario */}
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col justify-between">
          <h3 className="text-lg font-bold mb-2">
            Total: ${totalPrice.toFixed(2)}
          </h3>
          <div className="flex flex-col gap-4">
            {/* Pago automático con MP */}
            <button
              onClick={() => router.push("/checkout")}
              className="w-full bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition text-lg font-bold cursor-pointer"
            >
              ✔ Pagar con Mercado Pago
            </button>
            <p className="text-gray-600 text-sm text-center">
              ✅ Con este método tu pago se procesa automáticamente, solo
              restará coordinar el punto de entrega con un vendedor.
            </p>

            {/* Pedido manual con WhatsApp */}
            <WhatsAppButton order={items} />
            <p className="text-gray-600 text-sm text-center">
              📢 Si elegís este método, tu pedido será procesado manualmente con
              un vendedor para coordinar pago y entrega.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarritoPage;
