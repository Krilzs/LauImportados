import { supabase } from "@/lib/supabaseClient";
import CategoriasClient from "./CategoriasClient";
import ErrorPage from "@/components/errors/errorFetching";

export default async function CategoriasPage() {
  // 🔥 SSR: acá en el futuro podrías hacer fetch a tu DB
  let query = supabase.from("categorias").select("*");

  const { data: categorias, error } = await query;

  if (error) return <ErrorPage></ErrorPage>;

  return (
    <div className="mt-35 px-6">
      <h1 className="text-3xl font-bold text-center mb-10">
        Categorías de Productos
      </h1>
      <CategoriasClient categorias={categorias} />
    </div>
  );
}
