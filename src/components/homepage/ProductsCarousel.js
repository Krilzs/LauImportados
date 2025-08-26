"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import ProductCard from "@/components/homepage/ProductCard";

const ProductosCarousel = [
  {
    id: 1,
    name: "Vapers",
    description: "Explora la mejor selección de vapers de alta duración.",
    image: "/Carousel/Vapes.png",
  },
  {
    id: 2,
    name: "Perfumería",
    description: "Perfumes y fragancias exclusivas.",
    image: "/Carousel/Perfumeria.png",
  },
  {
    id: 3,
    name: "Cosmética",
    description: "Belleza y cuidado personal.",
    image: "/Carousel/Cosmetica.png",
  },
  {
    id: 4,
    name: "Tecnología",
    description: "Gadgets, auriculares y más.",
    image: "/Carousel/Consolas.png",
  },
  {
    id: 5,
    name: "Accesorios",
    description: "Cargadores, fundas y complementos.",
    image: "/Carousel/Electronica.png",
  },
];

const Carousel = () => {
  const carouselRef = useRef(null);
  const infiniteProducts = [...ProductosCarousel, ...ProductosCarousel];

  useEffect(() => {
    // Definimos la animación de GSAP
    const carouselAnim = gsap.to(carouselRef.current, {
      x: "-100%", // Mueve el contenedor el 100% de su ancho
      duration: 20, // La animación dura 15 segundos
      ease: "linear", // Velocidad constante
      repeat: -1, // Repite la animación infinitamente
    });
  }, []);

  return (
    <section className="h-screen w-full flex flex-col items-center justify-center">
      <h3 className="text-4xl font-bold text-center mb-5 mt-30 flex md:text-5xl md: mt-0">
        Nuestros Principales Productos
      </h3>
      <div className="carousel-container flex items-center overflow-hidden h-[500px] w-full md:w-4/5 relative">
        {/* Contenedor que se desliza y contiene todas las tarjetas */}

        <div ref={carouselRef} className="flex w-max h-full">
          {infiniteProducts.map((producto, index) => (
            <div
              key={index}
              className="flex-none h-full flex items-center justify-center p-4 w-1/6 md:w-1/6"
            >
              <ProductCard producto={producto} />
            </div>
          ))}
        </div>

        {/* Este div es la capa de la máscara de difuminado */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            maskImage:
              "linear-gradient(to right,black 100%, transparent , black 100%, transparent)",
            background:
              "linear-gradient(to right, #ededed, rgba(255, 0, 0, 0) 15%, rgba(255, 0, 0, 0) 85%, #ededed)",
          }}
        ></div>
      </div>
    </section>
  );
};

export default Carousel;
