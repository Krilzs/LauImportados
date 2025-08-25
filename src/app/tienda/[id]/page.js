import { supabase } from "@/lib/supabaseClient";
import ProductClient from "@/app/tienda/[id]/ProductClient";
import ErrorPage from "@/components/errors/errorFetching";

const ProductPage = async ({ params }) => {
  const { id } = await params;

  const query = supabase.from("productos").select("*").eq("id", id);

  const { data: product, error } = await query;

  console.log(product);

  if (error) return <ErrorPage />;

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <h1 className="text-2xl font-bold text-gray-700">
          Producto no encontrado
        </h1>
      </div>
    );
  }

  return <ProductClient product={product[0]} />;
};

export default ProductPage;
