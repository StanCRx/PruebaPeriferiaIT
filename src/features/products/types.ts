export type Category = "Cuenta" | "Crédito" | "Tarjeta";

export interface Product {
  id: number;
  code: string;
  name: string;
  description?: string;
  price: number;
  category: Category;
  reg_date: string;
  mod_date?: string | null;
  state: boolean;
}

export interface ProductFilters {
  page?: number;
  size?: number;
  q?: string;
  category?: Category;
  state?: boolean;
}

export interface FiltersState {
  search: string;
  page: number;
  size: number;
  category?: Category;
  state?: boolean;
}

export interface FiltersContextValue extends FiltersState {
  setSearch: (v: string) => void;
  setPage: (v: number) => void;
  setCategory: (v?: Category) => void;
  setState: (v?: boolean) => void;
  setSize: (v: number) => void;
  reset: () => void;
}

export interface ProductsResponse {
  data: Product[];
  total: number;
}
