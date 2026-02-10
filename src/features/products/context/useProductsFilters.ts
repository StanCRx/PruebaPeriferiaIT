import { useContext } from "react";
import { ProductsFiltersContext } from "./ProductsFiltersContext";

export const useProductsFilters = () => {
  const ctx = useContext(ProductsFiltersContext);
  if (!ctx) {
    throw new Error(
      "useProductsFilters must be used inside ProductsFiltersProvider",
    );
  }
  return ctx;
};
