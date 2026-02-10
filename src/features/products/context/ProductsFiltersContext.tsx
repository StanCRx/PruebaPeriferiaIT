import { createContext } from "react";
import type { FiltersContextValue } from "../types";

export const ProductsFiltersContext = createContext<FiltersContextValue | null>(
  null,
);
