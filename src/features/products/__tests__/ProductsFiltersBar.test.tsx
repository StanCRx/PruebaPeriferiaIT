import "@testing-library/jest-dom";
import { renderHook, act } from "@testing-library/react";
import { useProductsFilters } from "../context/useProductsFilters";
import { ProductsFiltersProvider } from "../context/ProductsFiltersProvider";
import React from "react";

describe("useProductsFilters hook", () => {
  it("actualiza correctamente los filtros", () => {
    const { result } = renderHook(() => useProductsFilters(), {
      wrapper: ({ children }: { children: React.ReactNode }) => (
        <ProductsFiltersProvider>{children}</ProductsFiltersProvider>
      ),
    });

    act(() => result.current.setSearch("Test"));
    expect(result.current.search).toBe("Test");

    act(() => result.current.setPage(2));
    expect(result.current.page).toBe(2);

    act(() => result.current.setCategory("Crédito"));
    expect(result.current.category).toBe("Crédito");

    act(() => result.current.setState(true));
    expect(result.current.state).toBe(true);

    act(() => result.current.setSize(10));
    expect(result.current.size).toBe(10);

    act(() => result.current.reset());
    expect(result.current.search).toBe("");
    expect(result.current.page).toBe(1);
    expect(result.current.category).toBeUndefined();
    expect(result.current.state).toBeUndefined();
    expect(result.current.size).toBe(10);
  });
});
