"use client";
import { useState } from "react";
import { FaWhatsapp, FaInstagram } from "react-icons/fa";
import emailjs from "emailjs-com";


const mail_service_id = process.env.NEXT_PUBLIC_MAIL_SERVICE_ID;
const mail_service_template = process.env.NEXT_PUBLIC_MAIL_SERVICE_TEMPLATE;
const mail_key = process.env.NEXT_PUBLIC_MAIL_SERVICE_KEY;

export default function ContactoPage() {
  const [form, setForm] = useState({
    user_nombre: "",
    user_email: "",
    user_mensaje: "",
  });
  const [statusResponse, setStatus] = useState(true);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleClearForm = () => {
    setForm({ user_nombre: "", user_email: "", user_mensaje: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        mail_service_id, // tu Service ID
        mail_service_template, // tu Template ID
        e.target,
        mail_key // tu Public Key
      )
      .then(
        (result) => {
          console.log(result.text);
          setStatus(
            <p className="text-xl font-bold text-green-800">
              ¡Mensaje enviado con éxito!
            </p>
          );
          handleClearForm();
          e.target.reset();
        },
        (error) => {
          console.log(error.text);
          setStatus(
            <p className="text-red-700 font-bold text-xl">
              Error al enviar el mensaje, intenta de nuevo.
            </p>
          );
        }
      );
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
                name="user_nombre"
                value={form.user_nombre}
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
                name="user_email"
                value={form.user_email}
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
                name="user_mensaje"
                value={form.user_mensaje}
                onChange={handleChange}
                required
                rows={5}
                className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-700 focus:border-black focus:ring-2 focus:ring-black/40 outline-none transition-all resize-none"
              />
            </div>
            <div>{statusResponse}</div>

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
              href="https://wa.me/5491170656865"
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
