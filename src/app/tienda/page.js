// Server Component
import TiendaClient from "./TiendaClient";
import productsData from "@/data/products.json";

export default async function ProductosPage({ searchParams }) {
  const params = await searchParams;

  const searchQuery = params?.search || "";
  const categoryQuery = params?.category || ""; // 👈 agregamos categoría

  // Filtrado por nombre y categoría
  let filteredProducts = productsData;

  if (searchQuery !== "") {
    filteredProducts = filteredProducts.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  if (categoryQuery !== "") {
    filteredProducts = filteredProducts.filter(
      (product) =>
        product.category?.toLowerCase() === categoryQuery.toLowerCase()
    );
  }

  return (
    <TiendaClient
      productos={filteredProducts}
      search={searchQuery}
      category={categoryQuery}
    />
  );
}
