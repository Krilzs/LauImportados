// Server Component
import TiendaClient from "./TiendaClient";
import productsData from "@/data/products.json";

export default async function ProductosPage({ searchParams }) {
  const params = await searchParams;

  const searchQuery = params?.search || "";

  // Filtramos los productos en el servidor
  const filteredProducts =
    searchQuery === ""
      ? productsData
      : productsData.filter((product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase())
        );

  return <TiendaClient productos={filteredProducts} search={searchQuery} />;
}
