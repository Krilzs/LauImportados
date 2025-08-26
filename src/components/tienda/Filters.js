"use client";
import { FaSortAmountUp, FaSortAmountDown } from "react-icons/fa";
import { useRouter, useSearchParams } from "next/navigation";

const Filters = ({
  handleFilterOpen,
  filterRef,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  sortOrder,
  handleSort,
  categorias,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category") || "";

  console.log(activeCategory);

  const handleCategory = (category) => {
    router.push(`/tienda?category=${encodeURIComponent(category)}`);
  };

  return (
    <aside
      id="filters"
      className="bg-white w-full rounded-2xl flex-col overflow-hidden shadow-md h-fit flex items-center justify-start mb-6 lg:w-2/6 xl:w-1/5 md:w-2/4"
    >
      <h5
        className="h-12 flex items-center w-full justify-center font-semibold text-gray-800 cursor-pointer hover:bg-gray-50 transition"
        onClick={handleFilterOpen}
      >
        Filtros
      </h5>

      <div
        ref={filterRef}
        className="flex h-0 flex-col w-full overflow-hidden transition-all"
      >
        {/* Categorías */}
        <div className="px-4 py-4 border-t border-b">
          <label className="block font-semibold  text-gray-700 mb-3">
            Categorías
          </label>
          <div className="flex flex-col gap-2">
            {categorias.map((c) => (
              <button
                key={c.id}
                onClick={() => handleCategory(c.id)}
                className={`text-left px-3 py-2 rounded-lg transition cursor-pointer ${
                  activeCategory == c.id
                    ? "bg-black text-white"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>
        </div>

        {/* Precio */}
        <div className="px-4 py-4 border-b">
          <label className="block font-semibold text-gray-700 mb-3">
            Precio
          </label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={minPrice}
              placeholder="Mín"
              onChange={(e) =>
                setMinPrice(e.target.value <= -1 ? 0 : e.target.value)
              }
              className="border w-20 rounded-lg px-2 py-1 text-sm focus:ring-2 focus:ring-black/40 outline-none"
            />
            <span className="text-gray-500">-</span>
            <input
              type="number"
              value={maxPrice}
              placeholder="Máx"
              onChange={(e) =>
                setMaxPrice(e.target.value <= -1 ? 0 : e.target.value)
              }
              className="border w-20 rounded-lg px-2 py-1 text-sm focus:ring-2 focus:ring-black/40 outline-none"
            />
          </div>
        </div>

        {/* Orden */}
        <div className="px-4 py-4">
          <label className="block font-semibold text-gray-700 mb-3">
            Ordenar
          </label>
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleSort("asc")}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition ${
                sortOrder === "asc"
                  ? "bg-black text-white"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-700"
              }`}
            >
              <FaSortAmountUp /> Asc
            </button>
            <button
              onClick={() => handleSort("desc")}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition ${
                sortOrder === "desc"
                  ? "bg-black text-white"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-700"
              }`}
            >
              <FaSortAmountDown /> Desc
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Filters;
