import { useProductsActions } from "../hooks/useProductsActions";
import type { Product } from "../types";
import { FaTrash } from "react-icons/fa";
import { memo, useState } from "react";
import { ProductEdit } from "./ProductEdit";

export const ProductCard = memo(({ product }: { product: Product }) => {
  const { deleteProduct } = useProductsActions();
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const handleDelete = () => {
    if (confirm(`¿Eliminar ${product.name}?`)) {
      deleteProduct.mutate(product, {
        onSuccess: () => {
          setNotification({
            message: `Producto "${product.name}" eliminado ✅`,
            type: "success",
          });
          setTimeout(() => setNotification(null), 4000);
        },
        onError: () => {
          setNotification({
            message: `Error al eliminar "${product.name}" ❌`,
            type: "error",
          });
          setTimeout(() => setNotification(null), 4000);
        },
      });
    }
  };

  return (
    <>
      {notification && (
        <div
          className={`fixed top-4 right-4 px-4 py-2 rounded-lg text-white shadow-lg transition ${
            notification.type === "success" ? "bg-green-600" : "bg-red-600"
          }`}
        >
          {notification.message}
        </div>
      )}

      <li className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-600 p-6 border border-gray-200 flex flex-col gap-3 border-l-8 border-l-[#FF9399]">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-bold text-[#E60026]">{product.name}</h3>
            <p className="text-sm text-gray-500">Código: {product.code}</p>
          </div>

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
            <ProductEdit product={product} />
            <button
              onClick={handleDelete}
              aria-label={`Eliminar ${product.name}`}
              className="flex items-center gap-1 bg-gray-200 text-gray-700 px-3 py-1 rounded-lg text-sm hover:bg-red-100 hover:text-red-700 transition hover:cursor-pointer"
            >
              <FaTrash className="text-xs" />
              Eliminar
            </button>
          </div>
        </div>
      </li>
    </>
  );
});
