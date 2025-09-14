import Image from "next/image";
import { useRouter } from "next/navigation";

const ProductCard = ({ producto }) => {
  const router = useRouter();
  const handleSearch = (category) => {
    router.push(`/tienda?category=${category}`);
  };

  return (
    <div
      onClick={() => {
        handleSearch(producto.id);
      }}
      className="bg-white rounded-lg h-fit min-h-[350px] w-full shadow-lg flex flex-col items-center justify-between p-8 max-w-sm text-center transition-all duration-300 ease-in-out hover:translate-y-10 overflow-hidden cursor-pointer active:scale-75"
    >
      <Image
        src={producto.image}
        alt={producto.name}
        width={200}
        height={300}
        className="rounded-lg"
      ></Image>
      <span>
        <h3 className="text-3xl font-bold">{producto.name}</h3>
        <p className="text-xl mt-2">{producto.description}</p>
      </span>
    </div>
  );
};

export default ProductCard;
