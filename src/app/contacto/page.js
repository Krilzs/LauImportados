"use client";
import { useState } from "react";
import { FaWhatsapp, FaInstagram } from "react-icons/fa";

export default function ContactoPage() {
  const [form, setForm] = useState({ nombre: "", email: "", mensaje: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Formulario enviado:", form);
    setForm({ nombre: "", email: "", mensaje: "" });
  };

  return (
    <main className="min-h-screen mt-30 md:mt-10 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-6">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-lg p-10 grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Columna izquierda: Formulario */}
        <div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Contacto</h1>
          <p className="text-gray-500 mb-8">
            ¿Tenés dudas, consultas o querés trabajar conmigo? ¡Mandame un
            mensaje! ✨
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="nombre"
                className="block text-sm font-medium text-gray-600"
              >
                Nombre
              </label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
                required
                className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-700 focus:border-black focus:ring-2 focus:ring-black/40 outline-none transition-all"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-600"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-700 focus:border-black focus:ring-2 focus:ring-black/40 outline-none transition-all"
              />
            </div>

            <div>
              <label
                htmlFor="mensaje"
                className="block text-sm font-medium text-gray-600"
              >
                Mensaje
              </label>
              <textarea
                id="mensaje"
                name="mensaje"
                value={form.mensaje}
                onChange={handleChange}
                required
                rows={5}
                className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-700 focus:border-black focus:ring-2 focus:ring-black/40 outline-none transition-all resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-black to-gray-800 text-white font-semibold hover:opacity-90 transition-all"
            >
              Enviar mensaje 🚀
            </button>
          </form>
        </div>

        {/* Columna derecha: Info de soporte */}
        <div className="flex flex-col justify-center bg-gray-50 rounded-xl p-8 shadow-inner">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Soporte y Ayuda
          </h2>
          <p className="text-gray-600 mb-6">
            Si tenés algún problema con la página, los productos o tus compras,
            también podés comunicarte por estos medios:
          </p>

          <div className="space-y-4">
            <a
              href="https://wa.me/5491123456789"
              target="_blank"
              className="flex items-center gap-3 text-lg text-gray-700 hover:text-green-600 transition-colors"
            >
              <FaWhatsapp size={22} /> WhatsApp
            </a>
            <a
              href="https://instagram.com/tuusuario"
              target="_blank"
              className="flex items-center gap-3 text-lg text-gray-700 hover:text-pink-500 transition-colors"
            >
              <FaInstagram size={22} /> Instagram
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
