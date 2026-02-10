import axios from "axios";
import type { Product, ProductFilters, ProductsResponse } from "../types";

// Listar productos
export const fetchProducts = async (
  filters: ProductFilters,
): Promise<ProductsResponse> => {
  const { data } = await axios.get<ProductsResponse>("/api/products", {
    params: filters,
  });
  return data;
};

// Obtener un producto por id
export const fetchProductById = async (id: number): Promise<Product> => {
  const { data } = await axios.get<Product>(`/api/products/${id}`);
  return data;
};

// Crear producto
export const createProduct = async (
  product: Omit<Product, "id" | "reg_date" | "mod_date">,
): Promise<Product> => {
  const { data } = await axios.post<Product>("/api/products", product);
  return data;
};

// Actualizar producto
export const update = async (product: Product): Promise<Product> => {
  const { data } = await axios.put<Product>(
    `/api/products/${product.id}`,
    product,
  );
  return data;
};

// Eliminar producto
export const deleteProd = async (
  product: Product,
): Promise<{ ok: boolean }> => {
  const { data } = await axios.delete(`/api/products/${product.id}`);
  return data;
};
