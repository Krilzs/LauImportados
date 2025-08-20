const { FaSortAmountUp, FaSortAmountDown } = require("react-icons/fa");

const Filters = ({
  handleFilterOpen,
  filterRef,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  sortOrder,
  handleSort,
}) => {
  return (
    <div
      id="filters"
      className="bg-[#f5f5f5] w-full rounded-xl flex-col overflow-hidden shadow-sm h-fit flex items-center justify-center mb-6 cursor-pointer md:w-1/5"
    >
      <h5
        className="h-10 flex items-center w-full justify-center font-semibold text-gray-700"
        onClick={handleFilterOpen}
      >
        Filtros
      </h5>
      <div ref={filterRef} className="flex h-0 flex-col w-full overflow-hidden">
        <span className="flex-col w-full items-start gap-2 mb-3">
          <label>Precio</label>
          <div className="flex items-center">
            <input
              type="number"
              value={minPrice}
              placeholder="Minimo"
              onChange={(e) =>
                setMinPrice(e.target.value <= -1 ? 0 : e.target.value)
              }
              className="border w-25 rounded px-2 py-1 mt-1 text-sm"
            />
            <p className="text-lg text-center mt-1 text-[#666]">-</p>
            <input
              type="number"
              value={maxPrice}
              placeholder="Maximo"
              onChange={(e) =>
                setMaxPrice(e.target.value <= -1 ? 0 : e.target.value)
              }
              className="border w-25 rounded px-2 py-1 mt-1 text-sm"
            />
          </div>
        </span>

        <div className="flex items-center gap-4 mt-2">
          <button
            onClick={() => handleSort("asc")}
            className={`flex items-center gap-1 px-3 py-1 rounded border ${
              sortOrder === "asc"
                ? "bg-black text-white"
                : "bg-white text-black"
            }`}
          >
            <FaSortAmountUp /> Asc
          </button>
          <button
            onClick={() => handleSort("desc")}
            className={`flex items-center gap-1 px-3 py-1 rounded border ${
              sortOrder === "desc"
                ? "bg-black text-white"
                : "bg-white text-black"
            }`}
          >
            <FaSortAmountDown /> Desc
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filters;

