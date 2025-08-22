import Link from "next/link";

const { default: Image } = require("next/image");
const { FaCartPlus } = require("react-icons/fa6");

const TiendaProductCard = ({ product }) => {
  const formatter = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
  });

  return (
    <Link
      href={`/tienda/${product.id}`}
      key={product.id}
      className="bg-white rounded-2xl shadow-md p-4 flex flex-col items-center justify-between hover:shadow-lg transition-all cursor-pointer hover:scale-101 "
    >
      <div className="w-full h-40 relative mb-3">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-contain rounded-xl"
        />
      </div>
      <h3 className="w-full text-sm font-semibold text-gray-800 line-clamp-2 text-start md:text-xl">
        {product.name}
      </h3>
      <div className="w-full flex items-center justify-between mt-3">
        <span className="text-lg font-bold text-gray-900">
          {product.stock <= 0 ? "Agotado" : formatter.format(product.price)}
        </span>
      </div>
    </Link>
  );
};

export default TiendaProductCard;
