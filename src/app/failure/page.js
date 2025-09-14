// /app/failure/page.js

export const metadata = {
  title: "Pago Fallido | Lau Importados",
};

export default async function FailurePage({}) {
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
          <strong>ID de pago:</strong>
        </p>
        <p>
          <strong>Estado:</strong>
        </p>
      </div>
    </div>
  );
}
