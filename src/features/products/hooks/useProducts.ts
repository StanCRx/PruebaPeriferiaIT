import { useQuery } from "@tanstack/react-query";
import * as api from "../api/products.api";
import type { ProductFilters, ProductsResponse } from "../types";

export const useProducts = (filters: ProductFilters) => {
  return useQuery<ProductsResponse>({
    queryKey: ["products", filters],
    queryFn: () => api.fetchProducts(filters),
  });
};
