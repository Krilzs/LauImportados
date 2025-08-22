"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { FaCartShopping, FaMagnifyingGlass } from "react-icons/fa6";
import PageItemList from "./PageItemList";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

const PageRoutes = [
  { name: "Tienda", path: "/tienda" },
  { name: "Categorias", path: "/categorias" },
  { name: "Contacto", path: "/contacto" },
];

const Header = () => {
  const [isMenuHide, setIsMenuHide] = useState(false);
  const [search, setSearch] = useState("");
  const [mounted, setMounted] = useState(false); // para Hydration
  const router = useRouter();

  const items = useSelector((state) => state.cart.items);

  // Evitar Hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Mostrar el menú al hacer scroll
  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleScroll = () => setIsMenuHide(window.pageYOffset > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim() !== "") {
      router.push(`/tienda?search=${encodeURIComponent(search.trim())}`);
      setSearch("");
    }
  };

  if (!mounted) return null; // no renderizamos nada hasta el cliente

  const totalQuantity = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="transform transition-transform duration-500 w-full flex flex-col items-center justify-center fixed top-0 z-10">
      {/* Header superior */}
      <div className="text-2xl w-full font-bold items-center justify-center flex text-center bg-white h-[8vh] px-5">
        {/* Logo */}
        <Link
          href="/"
          className="w-1/4 justify-start flex items-center lg:justify-center"
        >
          <Image
            src="/LauImportadosLogoBlack.png"
            width={100}
            height={100}
            alt="Lau Importado Logo"
          />
        </Link>

        {/* Buscador */}
        <form
          onSubmit={handleSearch}
          className="w-2/4 flex justify-center items-center px-2 gap-2"
        >
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar productos..."
            className="border rounded-l px-2 py-1 w-full text-sm focus:outline-none"
          />
          <button
            type="submit"
            className="bg-black text-xl text-white rounded-sm p-2 hover:bg-gray-800 transition-colors"
          >
            <FaMagnifyingGlass />
          </button>
        </form>

        {/* Carrito */}
        <Link
          href="/carrito"
          className="w-1/4 flex items-center justify-end cursor-pointer lg:justify-center lg:w-1/4"
        >
          <FaCartShopping />
          <p className="ml-2 text-sm">({totalQuantity})</p>
        </Link>
      </div>

      {/* Menú inferior */}
      <div
        className={`${
          isMenuHide ? "-translate-y-full" : "translate-y-0"
        } transform transition-transform duration-500 bg-white ease-in-out shadow-md h-fit w-full flex items-center justify-center font-bold -z-10`}
      >
        <ul className="flex w-full items-center justify-center">
          {PageRoutes.map((page) => (
            <PageItemList key={page.name} {...page} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Header;
