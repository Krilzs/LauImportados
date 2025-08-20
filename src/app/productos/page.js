"use client";
import productsData from "@/data/products.json";
import Image from "next/image";
import { FaCartPlus, FaSortAmountDown, FaSortAmountUp } from "react-icons/fa";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation"; // Para leer search
import Filters from "@/components/productos/Filters";

const formatter = new Intl.NumberFormat("es-AR");

export default function Productos() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams?.get("search")?.toLowerCase() || "";

  const [filterIsOpen, setFilterIsOpen] = useState(false);
  const filterRef = useRef(null);
  const [products, setProducts] = useState(productsData);
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
        ease: "power1.inOut",
      });
    } else {
      gsap.to(filterRef.current, {
        height: "auto",
        opacity: 1,
        padding: 20,
        duration: 0.2,
        ease: "power1.inOut",
      });
    }
  };

  const handleSort = (value) => {
    setSortOrder(value);
  };

  useEffect(() => {
    let filtered = [...productsData];

    // Filtrar por búsqueda del query param
    if (searchQuery !== "") {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(searchQuery)
      );
    }

    // Filtrar por precio
    if (minPrice !== "")
      filtered = filtered.filter((p) => p.price >= parseInt(minPrice));
    if (maxPrice !== "")
      filtered = filtered.filter((p) => p.price <= parseInt(maxPrice));

    // Ordenar
    if (sortOrder === "asc") filtered.sort((a, b) => a.price - b.price);
    if (sortOrder === "desc") filtered.sort((a, b) => b.price - a.price);

    setProducts(filtered);
  }, [minPrice, maxPrice, sortOrder, searchQuery]);

  return (
    <main className="flex h-fit min-h-screen mt-10 py-25 px-5 flex-col md:flex-row">
      {/* Filtros */}

      <Filters
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
      <section className="grid  w-full h-fit grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 md:px-5">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-2xl shadow-md p-4 flex flex-col items-center justify-between hover:shadow-lg transition-all"
          >
            <div className="w-full h-40 relative mb-3">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain rounded-xl"
              />
            </div>
            <h3 className=" w-full text-sm font-semibold text-gray-800 line-clamp-2 text-start md:text-xl">
              {product.name}
            </h3>
            <p className="text-gray-600 text-xs mt-1 line-clamp-2 text-start md:text-sm w-full">
              {product.description}
            </p>
            <div className="w-full flex items-center justify-between mt-3">
              <span className="text-lg font-bold text-gray-900">
                ${formatter.format(product.price)}
              </span>
              <button className="bg-black text-white p-2 rounded-xl hover:bg-gray-800 transition-colors">
                <FaCartPlus />
              </button>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
