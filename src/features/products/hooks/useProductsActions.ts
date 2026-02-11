import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduct, deleteProd, update } from "../api/products.api";
import type { Product } from "../types";

export const useProductsActions = () => {
  const queryClient = useQueryClient();

  const addProduct = useMutation<
    Product,
    Error,
    Omit<Product, "id" | "reg_date" | "mod_date">
  >({
    mutationFn: createProduct,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["products"] }),
  });

  const editProduct = useMutation<Product, Error, Product>({
    mutationFn: update,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["products"] }),
  });

  const deleteProduct = useMutation<{ ok: boolean }, Error, Product>({
    mutationFn: deleteProd,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["products"] }),
  });

  return { addProduct, editProduct, deleteProduct };
};
