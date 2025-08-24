"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaExclamationTriangle } from "react-icons/fa";

export default function ErrorPage({ error, reset }) {
  const router = useRouter();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-5">
      <div className="bg-white rounded-2xl shadow-lg p-10 text-center max-w-md">
        <FaExclamationTriangle className="text-red-500 text-6xl mb-4 mx-auto" />
        <h1 className="text-3xl font-bold mb-2">Ups! Algo salió mal</h1>
        <p className="text-gray-600 mb-6">
          Hubo un error al cargar los datos. Esto puede ser un problema temporal
          o un fallo con nuestra base de datos.
        </p>

        <p className="text-gray-500 text-sm mb-6">
          Si el problema persiste, por favor contacta soporte:
          <br />
          <strong>WhatsApp:</strong> +54 9 1234 5678
          <br />
          <strong>Instagram:</strong> @tu_tienda
        </p>

        <div className="flex gap-4 justify-center">
          <button
            onClick={() => router.refresh()}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Reintentar
          </button>
          <button
            onClick={() => router.push("/")}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition"
          >
            Ir al inicio
          </button>
        </div>
      </div>
    </main>
  );
}
