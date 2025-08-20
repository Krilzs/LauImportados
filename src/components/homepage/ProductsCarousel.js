"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const ProductosCarousel = [
  { nombre: "Casco", descripcion: "Descripción del casco 1" },
  { nombre: "Visor", descripcion: "Descripción del visor 2" },
  { nombre: "Guantes", descripcion: "Descripción de los guantes 3" },
  { nombre: "Botas", descripcion: "Descripción de las botas 4" },
];

const Carousel = () => {
  const carouselRef = useRef(null);
  const infiniteProducts = [...ProductosCarousel, ...ProductosCarousel];

  useEffect(() => {
    // Definimos la animación de GSAP
    const carouselAnim = gsap.to(carouselRef.current, {
      x: "-100%", // Mueve el contenedor el 100% de su ancho
      duration: 15, // La animación dura 15 segundos
      ease: "linear", // Velocidad constante
      repeat: -1, // Repite la animación infinitamente
    });

    // Pausamos la animación al pasar el ratón
    const container = carouselRef.current.closest(".carousel-container");
    container.addEventListener("mouseenter", () => carouselAnim.pause());

    // Reanudamos la animación al quitar el ratón
    container.removeEventListener("mouseenter", () => carouselAnim.pause());
    container.removeEventListener("mouseleave", () => carouselAnim.play());

    return () => {
      // Limpiamos los event listeners cuando el componente se desmonta
      container.removeEventListener("mouseenter", () => carouselAnim.pause());
      container.removeEventListener("mouseleave", () => carouselAnim.play());
    };
  }, []);

  return (
    <section className="h-screen w-full flex flex-col items-center justify-center">
      <div className="carousel-container my-10 flex items-center overflow-hidden h-[70vh] w-full md:w-4/5 relative">
        {/* Contenedor que se desliza y contiene todas las tarjetas */}
        <div ref={carouselRef} className="flex w-max h-full">
          {infiniteProducts.map((producto, index) => (
            <div
              key={index}
              className="flex-none h-full flex items-center justify-center p-4 w-1/4 md:w-1/5"
            >
              <div className="bg-white rounded-lg h-full w-full shadow-lg p-8 max-w-sm text-center">
                <h3 className="text-3xl font-bold">{producto.nombre}</h3>
                <p className="text-xl mt-2">{producto.descripcion}</p>
              </div>
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
