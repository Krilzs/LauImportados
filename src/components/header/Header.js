"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { FaCartShopping } from "react-icons/fa6";
import PageItemList from "./PageItemList";
import Link from "next/link";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { useRouter } from "next/navigation"; // Hook para redirecciones

const PageRoutes = [
  { name: "Productos", path: "/productos" },
  { name: "Categorias", path: "/categorias" },
  { name: "Contacto", path: "/contacto" },
];

const Header = () => {
  const [isMenuHide, setIsMenuHide] = useState(false);
  const [search, setSearch] = useState("");
  const router = useRouter(); // para redireccionar programáticamente

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleScroll = () => setIsMenuHide(window.pageYOffset > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim() !== "") {
      // Redirige a /productos con query ?search=...
      router.push(`/productos?search=${encodeURIComponent(search.trim())}`);
      setSearch("");
    }
  };

  return (
    <div className="transform transition-transform duration-500 w-full flex flex-col items-center justify-center fixed top-0 z-10">
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
        <button className="w-1/4 flex items-center justify-end cursor-pointer lg:justify-center lg:w-1/4">
          <FaCartShopping />
          <p className="ml-2 text-sm">(0)</p>
        </button>
      </div>

      {/* Menú */}
      <div
        className={`${
          isMenuHide ? "-translate-y-full" : "translate-y-0"
        } transform transition-transform duration-500 bg-white ease-in-out shadow-md h-fit w-full flex items-center justify-center font-bold -z-10`}
      >
        <ul className="flex w-fit items-center justify-center">
          {PageRoutes.map((page) => (
            <PageItemList key={page.name} {...page} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Header;
