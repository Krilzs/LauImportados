"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function CategoriasClient({ categorias }) {
  const router = useRouter();

  const handleCategory = (category) => {
    router.push(`/tienda?category=${encodeURIComponent(category)}`);
  };

  return (
    <section className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {categorias.map((categoria) => (
        <div
          key={categoria.id}
          onClick={() => handleCategory(categoria.id)} // 👈 pasa la categoría
          className="group cursor-pointer overflow-hidden rounded-2xl shadow-md bg-white hover:shadow-xl transition-all"
        >
          {/* Imagen con overlay */}
          <div className="relative h-52 w-full">
            <Image
              src={categoria.image}
              alt={categoria.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
            <h2 className="absolute bottom-4 left-4 text-xl font-bold text-white drop-shadow-lg">
              {categoria.name}
            </h2>
          </div>

          {/* Contenido */}
          <div className="p-4">
            <p className="text-gray-600 text-sm">{categoria.description}</p>
          </div>
        </div>
      ))}
    </section>
  );
}
