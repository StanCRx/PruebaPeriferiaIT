import { useState } from "react";
import { useProductsActions } from "../hooks/useProductsActions";
import type { Product } from "../types";
import { FaEdit } from "react-icons/fa";

interface ProductEditProps {
  product: Product;
}

export const ProductEdit = ({ product }: ProductEditProps) => {
  const { editProduct } = useProductsActions();
  const [isOpen, setIsOpen] = useState(false);
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const [form, setForm] = useState<
    Omit<Product, "id" | "reg_date" | "mod_date">
  >({
    code: product.code,
    name: product.name,
    description: product.description || "",
    price: product.price,
    category: product.category,
    state: product.state,
  });

  const handleOpen = () => {
    setForm({
      code: product.code,
      name: product.name,
      description: product.description || "",
      price: product.price,
      category: product.category,
      state: product.state,
    });
    setIsOpen(true);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        type === "number"
          ? Number(value)
          : name === "state"
            ? value === "true"
            : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    editProduct.mutate(
      { ...product, ...form },
      {
        onSuccess: () => {
          setNotification({
            message: "Producto editado correctamente ✅",
            type: "success",
          });
          setIsOpen(false);
          setTimeout(() => setNotification(null), 4000);
        },
        onError: () => {
          setNotification({
            message: "Error al editar el producto ❌",
            type: "error",
          });
          setTimeout(() => setNotification(null), 4000);
        },
      },
    );
  };

  return (
    <>
      <button
        onClick={handleOpen}
        className="flex items-center gap-1 bg-[#E60026] text-white px-3 py-1 rounded-lg text-sm hover:bg-[#FF0000] transition hover:cursor-pointer"
      >
        <FaEdit className="text-xs" />
        Editar
      </button>
      {notification && (
        <div
          className={`fixed top-4 right-4 px-4 py-2 rounded-lg text-white shadow-lg transition ${
            notification.type === "success" ? "bg-green-600" : "bg-red-600"
          }`}
        >
          {notification.message}
        </div>
      )}

      {isOpen && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-lg relative">
            <h2 className="text-lg font-bold text-[#E60026] mb-4">
              Editar Producto
            </h2>

            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">
                  Código <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="code"
                  value={form.code}
                  onChange={handleChange}
                  required
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#E60026]"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">
                  Nombre <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#E60026]"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">
                  Descripción
                </label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#E60026]"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">
                  Precio <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  min={0}
                  required
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#E60026]"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">
                  Categoría
                </label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#E60026]"
                >
                  <option value="Cuenta">Cuenta</option>
                  <option value="Crédito">Crédito</option>
                  <option value="Tarjeta">Tarjeta</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">
                  Estado
                </label>
                <select
                  name="state"
                  value={String(form.state)}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#E60026]"
                >
                  <option value="true">Activo</option>
                  <option value="false">Inactivo</option>
                </select>
              </div>
              <div className="flex justify-end gap-2 mt-2">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-[#E60026] text-white hover:bg-[#FF0000] transition"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
