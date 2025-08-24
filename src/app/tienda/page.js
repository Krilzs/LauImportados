import { supabase } from "@/lib/supabaseClient";
import TiendaClient from "@/app/tienda/TiendaClient";
import ErrorPage from "@/components/errors/errorFetching";

export default async function TiendaPage({ searchParams }) {
  const { search, category } = searchParams;

  console.log("Search:", search, "Category:", category);

  let productos_query = supabase.from("productos").select("*");
  const categorias_query = supabase.from("categorias").select("*");

  // Filtrar por nombre si hay search
  if (search) productos_query = productos_query.ilike("name", `%${search}%`);

  // Filtrar por categoría si hay category
  if (category) productos_query = productos_query.eq("category_id", category);

  const { data: productos, error: productosError } = await productos_query;
  const { data: categorias, error: categoriasError } = await categorias_query;

  if (productosError || categoriasError) return <ErrorPage />;

  return <TiendaClient productos={productos || []} categorias={categorias} />;
}
