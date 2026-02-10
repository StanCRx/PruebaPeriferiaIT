import { useProductsActions } from "../hooks/useProductsActions";
import type { Product } from "../types";
import { FaEdit, FaTrash } from "react-icons/fa";
import { memo } from "react";

export const ProductCard = memo(({ product }: { product: Product }) => {
  const { editProduct, deleteProduct } = useProductsActions();
  const handleEdit = () => {
    const updated: Product = { ...product, price: product.price + 100 };
    editProduct.mutate(updated);
  };

  const handleDelete = () => {
    if (confirm(`¿Eliminar ${product.name}?`)) {
      deleteProduct.mutate(product);
    }
  };
  return (
    <li className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-600 p-6 border border-gray-200 flex flex-col gap-3 border-l-8 border-l-[#FF9399]">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold text-[#E60026]">{product.name}</h3>
        <span
          className={`text-xs font-semibold px-2 py-1 rounded-full ${
            product.state
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {product.state ? "Activo" : "Inactivo"}
        </span>
      </div>

      <p className="text-sm text-gray-600 font-medium">{product.category}</p>
      <p className="text-gray-700 line-clamp-2">{product.description}</p>

      {/* Footer: precio + fecha + botones */}
      <div className="mt-4 flex justify-between items-center flex-wrap gap-2">
        <div className="flex flex-col">
          <span className="text-[#E60026] font-semibold text-sm">
            Precio: ${product.price.toLocaleString()}
          </span>
          <span className="text-gray-400 text-xs">
            Reg: {new Date(product.reg_date).toLocaleDateString()}
          </span>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleEdit}
            className="flex items-center gap-1 bg-[#E60026] text-white px-3 py-1 rounded-lg text-sm hover:bg-[#FF0000] transition hover:cursor-pointer"
          >
            <FaEdit className="text-xs" />
            Editar
          </button>
          <button
            onClick={handleDelete}
            className="flex items-center gap-1 bg-gray-200 text-gray-700 px-3 py-1 rounded-lg text-sm hover:bg-red-100 hover:text-red-700 transition hover:cursor-pointer"
          >
            <FaTrash className="text-xs" />
            Eliminar
          </button>
        </div>
      </div>
    </li>
  );
});
