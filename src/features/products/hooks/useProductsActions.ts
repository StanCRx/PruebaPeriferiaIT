import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProd, update } from "../api/products.api";
import type { Product } from "../types";

export const useProductsActions = () => {
  const queryClient = useQueryClient();

  const editProduct = useMutation<Product, Error, Product>({
    mutationFn: update,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["products"] }),
  });

  const deleteProduct = useMutation<{ ok: boolean }, Error, Product>({
    mutationFn: deleteProd,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["products"] }),
  });

  return { editProduct, deleteProduct };
};
