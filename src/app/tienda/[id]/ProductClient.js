"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { addToCart } from "@/store/cartSlice";

import { useRouter } from "next/navigation";

const ProductClient = ({ product }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [quantitySelected, setQuantitySelected] = useState(1);
  const [error, setError] = useState("");

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, quantity: quantitySelected }));
    setQuantitySelected(1); // Opcional: resetear input después de agregar
  };

  const handleQuantityChange = (e) => {
    if (e.target.value === "") {
      setError("Valor no válido");
      setQuantitySelected(0);
      return;
    }
    const value = parseInt(e.target.value);

    setQuantitySelected(value);

    if (value <= 0) {
      setError("Valor 0 o menor no válido");
      return;
    }

    if (value > product.stock) {
      setError("Cantidad mayor al stock disponible");
      return;
    }

    setError("");
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push(`/carrito`);
  };

  return (
    <div className="min-h-screen mt-40 flex justify-center">
      <div className="md:max-w-6xl w-full flex flex-col lg:flex-row md:gap-10">
        {/* Imagen */}
        <div className="lg:w-1/2 flex items-center justify-center p-6 bg-gray-100">
          <Image
            src={product.image ?? "https://placehold.co/600x400"}
            width={500}
            height={500}
            alt={product.name}
            className="rounded-lg object-contain"
          />
        </div>

        {/* Info + botones */}
        <div className="lg:w-1/2 bg-white p-8 flex flex-col justify-between md:rounded-lg md:shadow-md">
          <div>
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <p className="text-gray-600 mb-6">{product.description}</p>
            <p className="text-2xl font-semibold mb-6">${product.price}</p>
          </div>

          <div className="flex flex-col gap-4">
            <span className="flex items-center gap-2">
              <label htmlFor="quantity" className="text-gray-600 text-sm">
                Cantidad
              </label>
              <input
                disabled={product.stock === 0}
                type="number"
                id="quantity"
                value={quantitySelected}
                onChange={handleQuantityChange}
                min="1"
                max={product.stock}
                className="border w-fit rounded-md border-gray-600 p-2"
              />
            </span>

            <div className="flex flex-col gap-4 md:flex-row">
              <button
                disabled={product.stock === 0}
                onClick={handleBuyNow}
                className={`${
                  product.stock === 0
                    ? "cursor-not-allowed bg-gray-400 hover:bg-gray-400"
                    : "bg-yellow-400 hover:bg-yellow-500"
                } text-gray-900 px-6 py-3 rounded-lg font-bold transition md:w-1/2`}
              >
                Comprar ahora
              </button>

              <button
                disabled={
                  quantitySelected <= 0 || quantitySelected > product.stock
                }
                onClick={handleAddToCart}
                className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition md:w-1/2"
              >
                Agregar al carrito
              </button>
            </div>

            <p className="text-red-500 h-5">{error}</p>

            <span className="mt-6 text-gray-500 text-sm">
              <p>
                Stock disponible: <strong>{product.stock || 0}</strong>
              </p>
              <p>
                Vendido y entregado por <strong>Lau Importados</strong>
              </p>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductClient;
