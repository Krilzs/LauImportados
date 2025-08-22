import productsData from "@/data/products.json";

import ProductClient from "@/app/tienda/[id]/ProductClient";

const ProductPage = async ({ params }) => {
  const { id } = await params;

  const product = productsData.find((product) => product.id == id);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <h1 className="text-2xl font-bold text-gray-700">
          Producto no encontrado
        </h1>
      </div>
    );
  }

  return <ProductClient product={product} />;
};

export default ProductPage;
