"use client";
import { supabase } from "@/lib/supabaseClient";
import { useEffect, useState } from "react";
function ProductosTable() {
  const [productos, setProductos] = useState([]);
  const [allProductos, setAllProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category_id: "",
    image: "",
  });
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    setLoading(true);
    const { data: productosData, error: productosError } = await supabase
      .from("productos")
      .select("*");
    const { data: categoriesData, error: categoriesError } = await supabase
      .from("categorias")
      .select("*");
    if (productosError) console.error("Error fetching products:", productosError);
    if (categoriesError) console.error("Error fetching categories:", categoriesError);
    if (productosData) {
      setAllProductos(productosData);
      setProductos(productosData);
    }
    if (categoriesData) {
      setCategories(categoriesData);
    }
    setLoading(false);
  };
  useEffect(() => {
    if (searchTerm === "") {
      setProductos(allProductos);
    } else {
      const filtered = allProductos.filter((prod) =>
        prod.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setProductos(filtered);
    }
  }, [searchTerm, allProductos]);
  const handleChange = (id, field, value) => {
    setAllProductos((prev) =>
      prev.map((prod) => (prod.id === id ? { ...prod, [field]: value } : prod))
    );
  };
  const handleSave = async (producto) => {
    const { error } = await supabase
      .from("productos")
      .update({
        name: producto.name,
        description: producto.description,
        price: producto.price,
        stock: producto.stock,
        category_id: producto.category_id,
        image: producto.image,
      })
      .eq("id", producto.id);
    if (error) alert("Error al guardar: " + error.message);
    else alert("Producto actualizado");
  };
  const handleNewProductChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };
  const handleCreate = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from("productos")
      .insert([
        {
          name: newProduct.name,
          description: newProduct.description,
          price: parseFloat(newProduct.price),
          stock: parseInt(newProduct.stock),
          category_id: parseInt(newProduct.category_id),
          image: newProduct.image,
        },
      ])
      .select();
    if (error) {
      alert("Error al crear producto: " + error.message);
    } else {
      setAllProductos((prev) => [...prev, ...data]);
      setNewProduct({
        name: "",
        description: "",
        price: "",
        stock: "",
        category_id: "",
        image: "",
      });
      alert("Producto creado exitosamente");
    }
  };
  const handleSelectProduct = (id) => {
    setSelectedProducts((prev) => {
      if (prev.includes(id)) {
        return prev.filter((prodId) => prodId !== id);
      } else {
        return [...prev, id];
      }
    });
  };
  const handleDeleteSelected = async () => {
    if (selectedProducts.length === 0) {
      alert("Por favor, selecciona al menos un producto para eliminar.");
      return;
    }
    if (!window.confirm(`¿Estás seguro de que quieres eliminar ${selectedProducts.length} producto(s)?`)) {
      return;
    }
    const { error } = await supabase
      .from("productos")
      .delete()
      .in("id", selectedProducts);
    if (error) {
      alert("Error al eliminar los productos: " + error.message);
    } else {
      setAllProductos((prev) =>
        prev.filter((prod) => !selectedProducts.includes(prod.id))
      );
      setSelectedProducts([]);
      alert("Productos eliminados exitosamente");
    }
  };
  if (loading) return <p className="mt-30 text-center">Cargando...</p>;
  return (
    <div className="mt-30 p-4 sm:p-6">
      <h1 className="text-2xl font-bold mb-6">Gestión de Productos</h1>
      {/* Formulario de creación de nuevo producto */}
      <div className="bg-gray-100 p-4 rounded-lg mb-6 shadow-md">
        <h2 className="text-xl font-semibold mb-4">Crear Nuevo Producto</h2>
        <form onSubmit={handleCreate} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Nombre"
              value={newProduct.name}
              onChange={handleNewProductChange}
              className="border p-2 rounded w-full"
              required
            />
            <input
              type="text"
              name="description"
              placeholder="Descripción"
              value={newProduct.description}
              onChange={handleNewProductChange}
              className="border p-2 rounded w-full"
              required
            />
            <input
              type="number"
              name="price"
              placeholder="Precio"
              value={newProduct.price}
              onChange={handleNewProductChange}
              className="border p-2 rounded w-full"
              required
            />
            <input
              type="number"
              name="stock"
              placeholder="Stock"
              value={newProduct.stock}
              onChange={handleNewProductChange}
              className="border p-2 rounded w-full"
              required
            />
            <select
              name="category_id"
              value={newProduct.category_id}
              onChange={handleNewProductChange}
              className="border p-2 rounded w-full"
              required
            >
              <option value="">Selecciona una categoría</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            <input
              type="text"
              name="image"
              placeholder="URL de la imagen"
              value={newProduct.image}
              onChange={handleNewProductChange}
              className="border p-2 rounded w-full"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
          >
            Crear Producto
          </button>
        </form>
      </div>
      ---
      {/* Sección del buscador y la tabla existente */}
      <div className="mb-4 flex flex-col md:flex-row items-center md:justify-between space-y-4 md:space-y-0 md:space-x-4">
        <input
          type="text"
          placeholder="Buscar por nombre..."
          className="border p-2 w-full md:w-1/3 rounded"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          onClick={handleDeleteSelected}
          className={`px-4 py-2 rounded transition-colors duration-200 w-full md:w-auto ${
            selectedProducts.length > 0
              ? "bg-red-500 text-white hover:bg-red-600"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          disabled={selectedProducts.length === 0}
        >
          Eliminar Seleccionados ({selectedProducts.length})
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">
                <input
                  type="checkbox"
                  onChange={() => {
                    if (selectedProducts.length === productos.length) {
                      setSelectedProducts([]);
                    } else {
                      setSelectedProducts(productos.map((prod) => prod.id));
                    }
                  }}
                  checked={
                    selectedProducts.length === productos.length &&
                    productos.length > 0
                  }
                />
              </th>
              <th className="border p-2">ID</th>
              <th className="border p-2">Nombre</th>
              <th className="border p-2">Descripción</th>
              <th className="border p-2">Precio</th>
              <th className="border p-2">Stock</th>
              <th className="border p-2">Categoría</th>
              <th className="border p-2">Imagen</th>
              <th className="border p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((prod) => (
              <tr key={prod.id}>
                <td className="border p-2 text-center">
                  <input
                    type="checkbox"
                    checked={selectedProducts.includes(prod.id)}
                    onChange={() => handleSelectProduct(prod.id)}
                  />
                </td>
                <td className="border p-2">{prod.id}</td>
                <td className="border p-2">
                  <input
                    value={prod.name}
                    onChange={(e) =>
                      handleChange(prod.id, "name", e.target.value)
                    }
                    className="border p-1 w-full"
                  />
                </td>
                <td className="border p-2">
                  <input
                    value={prod.description}
                    onChange={(e) =>
                      handleChange(prod.id, "description", e.target.value)
                    }
                    className="border p-1 w-full"
                  />
                </td>
                <td className="border p-2">
                  <input
                    type="number"
                    value={prod.price}
                    onChange={(e) =>
                      handleChange(prod.id, "price", parseFloat(e.target.value))
                    }
                    className="border p-1 w-full"
                  />
                </td>
                <td className="border p-2">
                  <input
                    type="number"
                    value={prod.stock}
                    onChange={(e) =>
                      handleChange(prod.id, "stock", parseInt(e.target.value))
                    }
                    className="border p-1 w-full"
                  />
                </td>
                <td className="border p-2">
                  <select
                    value={prod.category_id || ""}
                    onChange={(e) =>
                      handleChange(
                        prod.id,
                        "category_id",
                        parseInt(e.target.value) || null
                      )
                    }
                    className="border p-1 w-full"
                  >
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="border p-2">
                  <input
                    value={prod.image}
                    onChange={(e) =>
                      handleChange(prod.id, "image", e.target.value)
                    }
                    className="border p-1 w-full"
                  />
                </td>
                <td className="border p-2 text-center">
                  <button
                    onClick={() => handleSave(prod)}
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                  >
                    Guardar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default ProductosTable;