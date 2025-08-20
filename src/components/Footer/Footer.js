"use client";
import Link from "next/link";
import { FaInstagram, FaFacebookF, FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full bg-white shadow-inner mt-10">
      <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
        {/* Logo / Marca */}
        <div className="flex flex-col items-center md:items-start">
          <h2 className="text-2xl font-bold">Lau Importados</h2>
          <p className="text-sm text-gray-500 mt-2">
            Vapes y más al mejor precio.
          </p>
        </div>

        {/* Links de navegación */}
        <div className="flex flex-col">
          <h3 className="font-semibold mb-2">Navegación</h3>
          <ul className="space-y-1 text-gray-600">
            <li>
              <Link href="/productos" className="hover:text-black">
                Productos
              </Link>
            </li>
            <li>
              <Link href="/categorias" className="hover:text-black">
                Categorías
              </Link>
            </li>
            <li>
              <Link href="/contacto" className="hover:text-black">
                Contacto
              </Link>
            </li>
          </ul>
        </div>

        {/* Redes sociales */}
        <div className="flex flex-col items-center md:items-end">
          <h3 className="font-semibold mb-2">Seguinos</h3>
          <div className="flex space-x-4 text-xl">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-500"
            >
              <FaInstagram />
            </a>
            <a
              href="https://wa.me/XXXXXXXXXXX"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-green-500"
            >
              <FaWhatsapp />
            </a>
          </div>
        </div>
      </div>

      {/* Copy */}
      <div className="bg-gray-100 py-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Lau Importados — Todos los derechos
        reservados.
      </div>
    </footer>
  );
};

export default Footer;
