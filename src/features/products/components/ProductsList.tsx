import { useDebounce } from "../../../shared/hooks/useDebounce";
import { useProductsFilters } from "../context/useProductsFilters";
import { useProducts } from "../hooks/useProducts";
import { ProductCard } from "./ProductCard";

export const ProductsList = () => {
  const { search, category, state, setPage, page, size, setSize } =
    useProductsFilters();
  const debounced = useDebounce(search);

  const { data, isLoading, isError, refetch } = useProducts({
    page,
    size,
    q: debounced || undefined,
    category,
    state,
  });

  const products = data?.data ?? [];
  const total = data?.total ?? 0;
  const totalPages = Math.ceil(total / size);

  if (!isLoading && products.length === 0)
    return (
      <p className="text-center text-gray-500 py-6">
        No se encontraron productos.
      </p>
    );

  if (isLoading)
    return (
      <div className="space-y-4">
        {Array.from({ length: size }).map((_, i) => (
          <div
            key={i}
            className="h-24 rounded-xl bg-gray-200 animate-pulse"
          ></div>
        ))}
      </div>
    );

  if (isError)
    return (
      <div className="text-center py-6">
        <p className="text-red-600 mb-2">Error cargando productos.</p>
        <button
          onClick={() => refetch()}
          className="bg-[#E60026] text-white px-4 py-2 rounded hover:bg-[#FF0000] transition"
        >
          Reintentar
        </button>
      </div>
    );

  return (
    <div className="space-y-6">
      <div className="flex justify-end mb-2">
        <label className="mr-2 font-medium text-gray-700">Mostrar:</label>
        <select
          value={size}
          onChange={(e) => {
            setSize(Number(e.target.value));
            setPage(1);
          }}
          className="border border-gray-300 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-[#E60026]"
        >
          {[5, 10, 20, 50].map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>
      <ul className="grid gap-4">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </ul>
      <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-md border border-gray-200">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-4 py-2 rounded-lg border border-gray-300 disabled:opacity-50 hover:border-[#E60026] hover:text-[#E60026] transition"
        >
          Anterior
        </button>

        <span className="text-gray-700 font-medium">
          Página {page} de {totalPages || 1}
        </span>

        <button
          disabled={page >= totalPages}
          onClick={() => setPage(page + 1)}
          className="px-4 py-2 rounded-lg border border-gray-300 disabled:opacity-50 hover:border-[#E60026] hover:text-[#E60026] transition"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};
