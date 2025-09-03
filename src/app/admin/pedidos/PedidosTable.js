// app/admin/pedidos/page.jsx
"use client";
import { supabase } from "@/lib/supabaseClient";
import { useEffect, useState } from "react";
// Componente Modal para el detalle del carrito
const PedidoModal = ({ pedido, onClose }) => {
  if (!pedido) return null;
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50 p-4">
      <div className="relative bg-white rounded-lg shadow-lg w-full max-h-[90vh] overflow-y-auto transform transition-all sm:w-2/3 md:w-1/2">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4 border-b pb-2">
            <h2 className="text-xl font-bold">Detalle del Pedido</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-800 text-2xl font-bold"
            >
              &times;
            </button>
          </div>
          <div className="mb-4 text-sm sm:text-base">
            <p>
              <strong>ID del Pedido:</strong> {pedido.id}
            </p>
            <p>
              <strong>Email:</strong> {pedido.user_email}
            </p>
            <p>
              <strong>Monto Total:</strong> ${pedido.total_amount}
            </p>
            <p>
              <strong>Estado:</strong> {pedido.status}
            </p>
          </div>
          <h3 className="text-lg font-semibold mb-2">Productos del Carrito</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr className="bg-gray-100 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  <th className="py-2 px-3 border-b border-gray-200 text-left">
                    Nombre
                  </th>
                  <th className="py-2 px-3 border-b border-gray-200 text-left">
                    Descripción
                  </th>
                  <th className="py-2 px-3 border-b border-gray-200 text-left">
                    Cantidad
                  </th>
                  <th className="py-2 px-3 border-b border-gray-200 text-left">
                    Precio Unitario
                  </th>
                  <th className="py-2 px-3 border-b border-gray-200 text-left">
                    Subtotal
                  </th>
                </tr>
              </thead>
              <tbody>
                {pedido.carrito.map((item) => (
                  <tr key={item.id}>
                    <td className="py-2 px-3 border-b border-gray-200 text-sm">
                      {item.name}
                    </td>
                    <td className="py-2 px-3 border-b border-gray-200 text-sm">
                      {item.description}
                    </td>
                    <td className="py-2 px-3 border-b border-gray-200 text-sm">
                      {item.quantity}
                    </td>
                    <td className="py-2 px-3 border-b border-gray-200 text-sm">
                      ${item.price}
                    </td>
                    <td className="py-2 px-3 border-b border-gray-200 text-sm">
                      {(item.price * item.quantity).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex justify-end">
            <button
              onClick={onClose}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition duration-200"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
function PedidosTable() {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPedido, setSelectedPedido] = useState(null);
  useEffect(() => {
    fetchPedidos();
  }, []);
  const fetchPedidos = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("pedidos")
      .select("*")
      .order("created_at", { ascending: false }); // Cambio aquí: orden descendente por fecha
    if (error) {
      console.error("Error al cargar los pedidos:", error);
    } else {
      setPedidos(data);
    }
    setLoading(false);
  };
  const handleViewDetails = (pedido) => {
    setSelectedPedido(pedido);
  };
  const handleCloseModal = () => {
    setSelectedPedido(null);
  };
  if (loading) {
    return <p className="mt-30 text-center">Cargando pedidos...</p>;
  }
  return (
    <div className="mt-30 p-4 sm:p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Gestión de Pedidos
      </h1>
      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-100">
            <tr className="text-xs md:text-sm">
              <th className="py-3 px-4 border-b border-gray-200 text-left font-semibold text-gray-600 uppercase tracking-wider">
                ID
              </th>
              <th className="py-3 px-4 border-b border-gray-200 text-left font-semibold text-gray-600 uppercase tracking-wider">
                Email del Usuario
              </th>
              <th className="py-3 px-4 border-b border-gray-200 text-left font-semibold text-gray-600 uppercase tracking-wider">
                Estado
              </th>
              <th className="py-3 px-4 border-b border-gray-200 text-left font-semibold text-gray-600 uppercase tracking-wider">
                Monto Total
              </th>
              <th className="py-3 px-4 border-b border-gray-200 text-left font-semibold text-gray-600 uppercase tracking-wider">
                Fecha
              </th>
              <th className="py-3 px-4 border-b border-gray-200 text-left font-semibold text-gray-600 uppercase tracking-wider">
                Nombre Comprador
              </th>
              <th className="py-3 px-4 border-b border-gray-200 text-left font-semibold text-gray-600 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {pedidos.length > 0 ? (
              pedidos.map((pedido) => (
                <tr
                  key={pedido.id}
                  className="hover:bg-gray-50 text-xs md:text-sm"
                >
                  <td className="py-3 px-4 border-b border-gray-200">
                    {pedido.id}
                  </td>
                  <td className="py-3 px-4 border-b border-gray-200">
                    {pedido.user_email}
                  </td>
                  <td className="py-3 px-4 border-b border-gray-200">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        pedido.status === "closed"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {pedido.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 border-b border-gray-200">
                    ${pedido.total_amount}
                  </td>
                  <td className="py-3 px-4 border-b border-gray-200">
                    {new Date(pedido.created_at).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4 border-b border-gray-200">
                    {pedido.buyer_first_name} {pedido.buyer_last_name}
                  </td>
                  <td className="py-3 px-4 border-b border-gray-200">
                    <button
                      onClick={() => handleViewDetails(pedido)}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-xs"
                    >
                      Ver Carrito
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-4 text-gray-500">
                  No se encontraron pedidos.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <PedidoModal pedido={selectedPedido} onClose={handleCloseModal} />
    </div>
  );
}
export default PedidosTable;
