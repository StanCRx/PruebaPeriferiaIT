import { useState } from "react";
import { useProductsActions } from "../hooks/useProductsActions";
import type { Product } from "../types";

export const ProductAdd = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState<
    Omit<Product, "id" | "reg_date" | "mod_date">
  >({
    code: "",
    name: "",
    description: "",
    price: 0,
    category: "Crédito",
    state: true,
  });

  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const { addProduct } = useProductsActions();

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

    addProduct.mutate(form, {
      onSuccess: () => {
        setNotification({
          message: "Producto creado correctamente ✅",
          type: "success",
        });
        setIsOpen(false);
        setForm({
          code: "",
          name: "",
          description: "",
          price: 0,
          category: "Crédito",
          state: true,
        });
        setTimeout(() => setNotification(null), 4000);
      },
      onError: () => {
        setNotification({
          message: "Error al crear el producto ❌",
          type: "error",
        });
        setTimeout(() => setNotification(null), 4000);
      },
    });
  };

  return (
    <>
      {/* Botón abrir modal */}
      <button
        onClick={() => setIsOpen(true)}
        className="bg-[#E60026] text-white px-4 py-2 rounded-lg hover:bg-[#FF0000] transition mb-4"
      >
        + Agregar Producto
      </button>

      {/* Notificación */}
      {notification && (
        <div
          className={`fixed top-4 right-4 px-4 py-2 rounded-lg text-white shadow-lg transition ${
            notification.type === "success" ? "bg-green-600" : "bg-red-600"
          }`}
        >
          {notification.message}
        </div>
      )}

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-lg relative">
            <h2 className="text-lg font-bold text-[#E60026] mb-4">
              Agregar Producto
            </h2>

            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              {/* Código */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">
                  Código <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="code"
                  value={form.code}
                  onChange={handleChange}
                  placeholder="Código del producto"
                  required
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#E60026]"
                />
              </div>

              {/* Nombre */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">
                  Nombre <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Nombre del producto"
                  required
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#E60026]"
                />
              </div>

              {/* Descripción */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">
                  Descripción
                </label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Descripción del producto"
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#E60026]"
                />
              </div>

              {/* Precio */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">
                  Precio <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  placeholder="Precio del producto"
                  min={0}
                  required
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#E60026]"
                />
              </div>

              {/* Categoría */}
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

              {/* Estado */}
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

              {/* Botones */}
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
