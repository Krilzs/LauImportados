"use client";
import { redirect } from "next/navigation";

export default function AdminClient({ session }) {
  return (
    <div className="mt-30 flex items-center justify-center h-[70vh] ">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-2xl h-fit p-8 border">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">
          Panel de Administración
        </h1>
        <p className="text-gray-600 mb-6 text-center">
          Bienvenido <span className="font-medium">{session.user?.email}</span>
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Aquí podés poner los módulos del CRUD */}
          <div
            onClick={() => redirect("/admin/productos")}
            className="bg-blue-50 rounded-xl p-6 text-center shadow-sm hover:shadow-md transition cursor-pointer"
          >
            <h2 className="font-semibold text-lg text-blue-700 mb-2">
              Productos
            </h2>
            <p className="text-gray-600">Gestiona stock, precios e imágenes</p>
          </div>
          <div
            onClick={() => redirect("/admin/pedidos")}
            className="bg-green-50 rounded-xl p-6 text-center shadow-sm hover:shadow-md transition cursor-pointer"
          >
            <h2 className="font-semibold text-lg text-green-700 mb-2">
              Pedidos
            </h2>
            <p className="text-gray-600">
              Revisa y gestiona las órdenes de los clientes
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
