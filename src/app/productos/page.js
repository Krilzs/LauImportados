// Server Component
import ProductosClient from "./ProductosClient";
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

  return <ProductosClient productos={filteredProducts} search={searchQuery} />;
}
