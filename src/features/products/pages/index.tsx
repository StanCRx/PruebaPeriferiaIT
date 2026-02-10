import { ProductsFiltersProvider } from "../context/ProductsFiltersProvider";
import { ProductsFiltersBar } from "../components/ProductsFiltersBar";
import { ProductsList } from "../components/ProductsList";

export default function ProductsPage() {
  return (
    <ProductsFiltersProvider>
      <div className="p-6">
        <ProductsFiltersBar />
        <ProductsList />
      </div>
    </ProductsFiltersProvider>
  );
}
