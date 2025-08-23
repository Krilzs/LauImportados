"use client";
import { useSearchParams } from "next/navigation";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const paymentId = searchParams.get("payment_id");
  const status = searchParams.get("status");
  const merchantOrderId = searchParams.get("merchant_order_id");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 text-center p-6">
      <h1 className="text-3xl font-bold text-green-700 mb-4">
        ✅ ¡Pago aprobado con éxito!
      </h1>
      <p className="text-lg text-gray-700">Gracias por tu compra 🎉</p>

      <div className="mt-6 bg-white shadow-md rounded-lg p-4">
        <p><strong>ID de pago:</strong> {paymentId}</p>
        <p><strong>Estado:</strong> {status}</p>
        <p><strong>Orden:</strong> {merchantOrderId}</p>
      </div>
    </div>
  );
}
