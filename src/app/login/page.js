"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    await signIn("credentials", {
      email,
      password,
      callbackUrl: "/admin",
    });
  };

  return (
    <div className="flex justify-center items-center mt-30 h-[60vh]">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md border">
        <h1 className="text-2xl font-semibold text-center mb-6 text-gray-800">
          Iniciar sesión
        </h1>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Contraseña
            </label>
            <input
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 rounded-lg transition-colors"
          >
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
}
