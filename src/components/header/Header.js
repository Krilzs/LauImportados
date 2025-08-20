"use client";
import Image from "next/image";
import { useState } from "react";
import { FaCartShopping } from "react-icons/fa6";
import PageItemList from "./PageItemList";
import Link from "next/link";

const PageRoutes = [
  {
    name: "Productos",
    path: "/productos",
  },
  {
    name: "Categorias",
    path: "/categorias",
  },
  {
    name: "Contacto",
    path: "/contacto",
  },
];
const Header = () => {
  const [isMenuHide, seIsMenuHide] = useState(false);

  const handleMenuHide = (value) => {
    seIsMenuHide(value);
  };

  window.addEventListener("scroll", () => {
    const currentScrollY = window.pageYOffset;

    if (currentScrollY > 0) {
      handleMenuHide(true);
    } else if (currentScrollY == 0) {
      handleMenuHide(false);
    }
  });

  return (
    <div className="transform transition-transform duration-500 w-full flex flex-col items-center justify-center fixed top-0 z-10">
      <div
        id="header"
        className="text-2xl w-full font-bold items-center justify-center flex text-center bg-white  h-[8vh] px-5 "
      >
        <Link
          href="/"
          className="w-3/4 justify-start flex items-center lg:justify-center lg:w-1/2 "
        >
          <Image
            src="/LauImportadosLogoBlack.png"
            width={100}
            height={100}
            alt="Lau Importado Logo"
          />
        </Link>
        <button className="w-1/4 flex items-center justify-end cursor-pointer lg:justify-center lg:w-1/2 ">
          <FaCartShopping />
          <p className="ml-2 text-sm">( 0 )</p>
        </button>
      </div>
      <div
        className={`${
          isMenuHide ? "-translate-y-full" : "translate-y-0"
        } transform transition-transform duration-500 bg-white ease-in-out shadow-md h-fit w-full flex items-center justify-center font-bold -z-10`}
      >
        <ul className="flex w-fit items-center justify-center ">
          {PageRoutes.map((page) => {
            return <PageItemList key={page.name} {...page} />;
          })}
        </ul>
      </div>
    </div>
  );
};

export default Header;
