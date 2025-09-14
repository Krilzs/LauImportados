export const metadata = {
  title: "Pago Pendiente | Lau Importados",
};

export default async function PendingPage({}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-yellow-50 text-center p-6">
      <h1 className="text-3xl font-bold text-yellow-600 mb-4">
        ⏳ Pago en proceso
      </h1>
      <p className="text-lg text-gray-700">
        Tu pago está pendiente de confirmación. Te notificaremos cuando se
        apruebe ✅
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
