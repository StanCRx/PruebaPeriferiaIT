import React from "react";
import { ProductsFiltersProvider } from "../features/products/context/ProductsFiltersProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const createTestQueryClient = () =>
  new QueryClient({ defaultOptions: { queries: { retry: false } } });

export const AllProviders: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const queryClient = createTestQueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <ProductsFiltersProvider>{children}</ProductsFiltersProvider>
    </QueryClientProvider>
  );
};
