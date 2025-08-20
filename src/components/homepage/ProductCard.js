import Image from "next/image";

const ProductCard = ({ producto }) => {
  return (
    <div className="bg-white rounded-lg h-fit min-h-[350px] w-full shadow-lg flex flex-col items-center justify-between p-8 max-w-sm text-center transition-all duration-300 ease-in-out hover:translate-y-10">
      <Image
        src={producto.src}
        alt={producto.nombre}
        width={200}
        height={300}
        className="outline-1 rounded-lg"
      ></Image>
      <span>
        <h3 className="text-3xl font-bold">{producto.nombre}</h3>
        <p className="text-xl mt-2">{producto.descripcion}</p>
      </span>
    </div>
  );
};

export default ProductCard;
