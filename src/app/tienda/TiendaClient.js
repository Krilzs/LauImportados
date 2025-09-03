"use client";

import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import Filters from "@/components/tienda/Filters";
import TiendaProductCard from "@/components/tienda/TiendaProductCard";
import { LuSearchX } from "react-icons/lu";

export default function TiendaClient({ productos, categorias }) {
  const [filterIsOpen, setFilterIsOpen] = useState(false);
  const filterRef = useRef(null);
  const [products, setProducts] = useState(productos);

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortOrder, setSortOrder] = useState(""); // "asc" | "desc"

  const handleFilterOpen = () => {
    setFilterIsOpen(!filterIsOpen);
    if (filterIsOpen) {
      gsap.to(filterRef.current, {
        height: 0,
        opacity: 0,
        padding: 0,
        duration: 0.2,
        ease: "power2.inOut",
      });
    } else {
      gsap.to(filterRef.current, {
        height: "auto",
        opacity: 1,
        paddingRight: 20,
        paddingLeft: 20,
        paddingTop: 20,
        duration: 0.2,
        ease: "power2.inOut",
      });
    }
  };

  const handleSort = (value) => {
    setSortOrder(value);
  };

  useEffect(() => {
    let filtered = [...productos];

    // Filtrar por precio
    if (minPrice !== "")
      filtered = filtered.filter((p) => p.price >= parseInt(minPrice));
    if (maxPrice !== "")
      filtered = filtered.filter((p) => p.price <= parseInt(maxPrice));

    // Ordenar
    if (sortOrder === "asc") filtered.sort((a, b) => a.price - b.price);
    if (sortOrder === "desc") filtered.sort((a, b) => b.price - a.price);

    setProducts(filtered);
  }, [minPrice, maxPrice, sortOrder, productos]);

  return (
    <main className="flex h-fit min-h-screen mt-10 py-25 px-5 flex-col md:flex-row">
      {/* Filtros */}
      <Filters
        categorias={categorias}
        handleFilterOpen={handleFilterOpen}
        filterRef={filterRef}
        minPrice={minPrice}
        setMinPrice={setMinPrice}
        maxPrice={maxPrice}
        setMaxPrice={setMaxPrice}
        sortOrder={sortOrder}
        handleSort={handleSort}
      />

      {/* Grid de productos */}
      {productos.length > 0 && (
        <section className="grid w-full h-fit grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 md:px-5">
          {products.map((product) => (
            <TiendaProductCard key={product.id} product={product} />
          ))}
        </section>
      )}

      {productos.length === 0 && (
        <div className="w-full h-[50vh] flex justify-center items-center font-bold text-center text-gray-400 flex-col">
          <LuSearchX className="text-7xl mb-5" />
          <p className="text-xl">No se encontraron productos.</p>
        </div>
      )}
    </main>
  );
}
