import { useMemo, useState } from "react";
import { ProductsFiltersContext } from "./ProductsFiltersContext";
import type { Category } from "../types";
import type { FiltersContextValue } from "../types";

export const ProductsFiltersProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [size] = useState(5);
  const [category, setCategory] = useState<Category | undefined>();
  const [state, setState] = useState<boolean | undefined>();

  const reset = () => {
    setSearch("");
    setPage(1);
    setCategory(undefined);
    setState(undefined);
  };

  const value: FiltersContextValue = useMemo(
    () => ({
      search,
      page,
      size,
      category,
      state,
      setSearch,
      setPage,
      setCategory,
      setState,
      reset,
    }),
    [search, page, size, category, state],
  );

  return (
    <ProductsFiltersContext.Provider value={value}>
      {children}
    </ProductsFiltersContext.Provider>
  );
};
