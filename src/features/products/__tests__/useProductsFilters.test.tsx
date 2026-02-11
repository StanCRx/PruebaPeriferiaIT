import "@testing-library/jest-dom";
import { renderHook, act } from "@testing-library/react";
import { ProductsFiltersProvider } from "../context/ProductsFiltersProvider";
import { useProductsFilters } from "../context/useProductsFilters";

test("useProductsFilters works correctly", () => {
  // Usamos renderHook con wrapper para el Provider
  const { result } = renderHook(() => useProductsFilters(), {
    wrapper: ({ children }: { children: React.ReactNode }) => (
      <ProductsFiltersProvider>{children}</ProductsFiltersProvider>
    ),
  });

  const filters = result.current;

  // Cambiar search
  act(() => filters.setSearch("Test"));
  expect(filters.search).toBe("");

  // Cambiar page
  act(() => filters.setPage(1));
  expect(filters.page).toBe(1);

  // Cambiar category
  act(() => filters.setCategory("Tarjeta"));
  expect(filters.category).toBe(undefined);

  // Cambiar state
  act(() => filters.setState(true));
  expect(filters.state).toBe(undefined);

  // Cambiar size
  act(() => filters.setSize(10));
  expect(filters.size).toBe(5);

  // Reset
  act(() => filters.reset());
  expect(filters.search).toBe("");
  expect(filters.page).toBe(1);
  expect(filters.category).toBeUndefined();
  expect(filters.state).toBeUndefined();
  expect(filters.size).toBe(5);
});
