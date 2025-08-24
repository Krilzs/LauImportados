import { supabase } from "./supabaseClient";

export const getProducts = async ({ category, search }) => {
  let query = supabase.from("productos").select("*");

  // Filtrar por nombre si hay search
  if (search) query = query.ilike("name", `%${search}%`);

  // Filtrar por categoría si hay category
  if (category) query = query.eq("category_id", category);

  const { data, error } = await query;
  if (error) throw error;
  return data;
};
