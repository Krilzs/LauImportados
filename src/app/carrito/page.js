"use client";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "@/store/cartSlice";

import Image from "next/image";

const CarritoPage = () => {
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleQuantityChange = (id, value, stock) => {
    dispatch(updateQuantity({ id, quantity: value }));
  };

  const totalPrice = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  if (items.length === 0)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold text-gray-700">
          Tu carrito está vacío
        </h1>
      </div>
    );

  return (
    <div className="min-h-screen mt-40 px-6 md:px-20">
      <h1 className="text-3xl font-bold mb-6">Carrito de Compras</h1>
      <div className="flex flex-col gap-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex flex-col md:flex-row items-center bg-white p-4 rounded-lg shadow-md"
          >
            {/* Imagen */}
            <div className="w-full md:w-1/4 flex justify-center mb-4 md:mb-0">
              <Image
                src={item.image}
                width={150}
                height={150}
                alt={item.name}
                className="rounded-md object-contain"
              />
            </div>

            {/* Información */}
            <div className="flex-1 flex flex-col gap-2 md:ml-6">
              <h2 className="text-xl font-bold">{item.name}</h2>
              <p className="text-gray-600">${item.price} c/u</p>

              <div className="flex items-center gap-4">
                <label htmlFor={`qty-${item.id}`} className="text-gray-600">
                  Cantidad:
                </label>
                <input
                  id={`qty-${item.id}`}
                  type="number"
                  min="1"
                  max={item.stock}
                  value={item.quantity}
                  onChange={(e) =>
                    handleQuantityChange(
                      item.id,
                      parseInt(e.target.value),
                      item.stock
                    )
                  }
                  className="border rounded-md p-1 w-16"
                />
              </div>
            </div>

            {/* Subtotal */}
            <div className="mt-4 md:mt-0 md:ml-6 font-bold text-gray-800">
              <p> Subtotal: ${item.price * item.quantity}</p>
              <button
                onClick={() => handleRemove(item.id)}
                className="mt-2 text-red-500 font-semibold hover:underline"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}

        {/* Total */}
        <div className="flex justify-end mt-6">
          <h2 className="text-2xl font-bold">
            Total: ${totalPrice.toFixed(2)}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default CarritoPage;
