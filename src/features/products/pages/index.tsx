import { ProductsFiltersProvider } from "../context/ProductsFiltersProvider";
import { ProductsFiltersBar } from "../components/ProductsFiltersBar";
import { ProductsList } from "../components/ProductsList";
import { ProductAdd } from "../components/ProductAdd";

export default function ProductsPage() {
  return (
    <ProductsFiltersProvider>
      <div className="p-6">
        <ProductsFiltersBar />
        <div className="flex justify-end">
          <ProductAdd />
        </div>

        <ProductsList />
      </div>
    </ProductsFiltersProvider>
  );
}
