import { useCallback } from "react";
import { useProductsFilters } from "../context/useProductsFilters";
import type { Category } from "../types";

export const ProductsFiltersBar = () => {
  const { search, setSearch, category, setCategory, state, setState, setPage } =
    useProductsFilters();

  const CATEGORY_OPTIONS: Array<Category> = ["Cuenta", "Crédito", "Tarjeta"];

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value);
      setPage(1);
    },
    [setSearch, setPage],
  );

  return (
    <div className="flex flex-wrap gap-3 mb-6 items-center bg-white p-5 rounded-2xl shadow-lg border border-gray-200">
      {/* Input de búsqueda con icono */}
      <div className="relative flex-1">
        <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
          🔍
        </span>
        <input
          value={search}
          onChange={handleSearchChange}
          placeholder="Buscar producto"
          className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 bg-gray-50 text-gray-900 placeholder-gray-400
                     focus:border-[#E60026] focus:ring-2 focus:ring-[#E60026]/50 focus:outline-none transition"
        />
      </div>

      {/* Select de categoría */}
      <select
        value={category ?? ""}
        onChange={(e) => {
          const value = e.target.value as Category | "";
          setCategory(value || undefined);
          setPage(1);
        }}
        className="rounded-xl border border-gray-300 bg-gray-50 text-gray-900 px-4 py-2
                   focus:border-[#E60026] focus:ring-2 focus:ring-[#E60026]/50 focus:outline-none transition"
      >
        <option value="">Todas</option>
        {CATEGORY_OPTIONS.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>

      {/* Select de estado */}
      <select
        value={state === undefined ? "" : String(state)}
        onChange={(e) => {
          const v = e.target.value;
          setState(v === "" ? undefined : v === "true");
          setPage(1);
        }}
        className="rounded-xl border border-gray-300 bg-gray-50 text-gray-900 px-4 py-2
                   focus:border-[#E60026] focus:ring-2 focus:ring-[#E60026]/50 focus:outline-none transition"
      >
        <option value="">Todos</option>
        <option value="true">Activos</option>
        <option value="false">Inactivos</option>
      </select>
    </div>
  );
};
