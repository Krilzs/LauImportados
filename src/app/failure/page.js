"use client";
import { useSearchParams } from "next/navigation";

export default function FailurePage() {
  const searchParams = useSearchParams();
  const paymentId = searchParams.get("payment_id");
  const status = searchParams.get("status");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-red-50 text-center p-6">
      <h1 className="text-3xl font-bold text-red-700 mb-4">
        ❌ El pago no pudo completarse
      </h1>
      <p className="text-lg text-gray-700">
        Hubo un problema con tu transacción. Intenta nuevamente.
      </p>

      <div className="mt-6 bg-white shadow-md rounded-lg p-4">
        <p>
          <strong>ID de pago:</strong> {paymentId}
        </p>
        <p>
          <strong>Estado:</strong> {status}
        </p>
      </div>
    </div>
  );
}

export const dynamic = "force-dynamic";
