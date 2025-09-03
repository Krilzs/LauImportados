import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import ProductosTable from "./ProductosTable";

// Inicializa Supabase (solo public key, safe para cliente si es lectura y edición limitada)

export default async function ProductosPage() {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/login");

  return <ProductosTable />;
}

// Componente cliente
