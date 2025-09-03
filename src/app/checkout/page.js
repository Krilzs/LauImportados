"use client";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const CheckoutPage = () => {
  const items = useSelector((state) => state.cart.items);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    deliveryPoint: "",
  });
  const [loading, setLoading] = useState(false);

  // Lista de puntos de entrega
  const deliveryOptions = [
    "Plaza San Martín | Moreno Centro",
    "Nine Shopping | Au. Acceso Oeste",
    "Plaza Libertad | Francisco Alvarez",
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName || !formData.deliveryPoint) {
      setError("Por favor, completa todos los campos");
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/create_preference", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items, buyerData: formData }),
      });

      const data = await res.json();
      if (data.init_point) window.location.href = data.init_point;
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  if (items.length === 0)
    return (
      <div className="max-w-3xl h-screen mx-auto p-6 mt-30">
        <h1 className="text-3xl font-bold mb-6">Checkout</h1>
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto p-6 mt-30">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      <form onSubmit={handleCheckout} className="flex flex-col gap-4">
        <input
          type="text"
          name="firstName"
          placeholder="Nombre *"
          value={formData.firstName}
          onChange={handleChange}
          required
          className="border rounded px-3 py-2"
        />
        <input
          type="text"
          name="lastName"
          placeholder="Apellido *"
          value={formData.lastName}
          onChange={handleChange}
          required
          className="border rounded px-3 py-2"
        />

        {/* Selector de punto de entrega tipo puntitos */}
        <div className="flex gap-4 flex-col mt-2">
          <p>
            Punto de entrega <span className="text-red-500">*</span>
          </p>
          {deliveryOptions.map((opt) => (
            <label key={opt} className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="deliveryPoint"
                value={opt}
                checked={formData.deliveryPoint === opt}
                onChange={handleChange}
                className="hidden"
              />
              <span
                className={`w-5 h-5 rounded-full border flex items-center justify-center mr-2
                  ${formData.deliveryPoint === opt ? "bg-blue-600 border-blue-600" : "bg-white border-gray-400"}
                `}
              ></span>
              {opt}
            </label>
          ))}
        </div>

        {/* Mensaje agregado aquí */}
        <p className="text-sm text-gray-500 mt-2">
          Al hacer clic, serás redirigido a Mercado Pago para completar tu pago.
          Una vez finalizado el proceso, regresarás automáticamente a esta
          página para verificar el estado de tu compra, por favor no cierres la
          ventana.
        </p>

        {error && (
          <div className="text-red-500 text-center mt-2 font-semibold p-2 bg-red-100 rounded">
            <p>{error}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition mt-4 font-bold cursor-pointer hover:scale-102"
        >
          {loading ? "Procesando..." : "Ir a pagar con Mercado Pago"}
        </button>
      </form>

      <div className="mt-6">
        <h2 className="text-xl font-bold mb-2">Resumen del carrito</h2>
        {items.map((item) => (
          <div key={item.id} className="flex justify-between py-1">
            <span>
              {item.quantity}x {item.name}
            </span>
            <span>${item.price * item.quantity}</span>
          </div>
        ))}
        <div className="flex justify-between font-bold mt-2">
          <span>Total:</span>
          <span>
            ${items.reduce((acc, item) => acc + item.price * item.quantity, 0)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
