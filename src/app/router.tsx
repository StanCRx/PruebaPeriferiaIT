import { createBrowserRouter } from "react-router";
import ProductsPage from "../features/products/pages";

export const router = createBrowserRouter([
  { path: "/", element: <ProductsPage /> },
]);
