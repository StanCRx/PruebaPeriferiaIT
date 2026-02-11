import "@testing-library/jest-dom";
import { fireEvent, screen } from "@testing-library/react";
import { ProductCard } from "../components/ProductCard";
import type { Product } from "../types";
import { render } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Helper para envolver componentes con QueryClientProvider
const renderWithQueryClient = (ui: React.ReactNode) => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>,
  );
};

// Mockear useProductsActions
jest.mock("../hooks/useProductsActions", () => ({
  useProductsActions: () => ({
    deleteProduct: {
      mutate: (product: Product, { onSuccess }: { onSuccess?: () => void }) =>
        onSuccess?.(),
    },
  }),
}));

const productMock: Product = {
  id: 1,
  code: "CEM0010",
  name: "Crédito Empresarial",
  description: "Línea para capital de trabajo y expansión.",
  price: 50000,
  category: "Crédito",
  reg_date: "2025-12-10T09:00:00Z",
  mod_date: "2026-01-15T11:00:00Z",
  state: true,
};

describe("ProductCard component", () => {
  it("muestra la información del producto correctamente", () => {
    renderWithQueryClient(<ProductCard product={productMock} />);

    expect(screen.getByText("Crédito Empresarial")).toBeInTheDocument();
    expect(screen.getByText("Crédito")).toBeInTheDocument();
    expect(screen.getByText(/50,000/)).toBeInTheDocument();
    expect(screen.getByText("Activo")).toBeInTheDocument();
  });

  it("llama onDelete cuando se elimina", async () => {
    window.confirm = jest.fn(() => true);

    renderWithQueryClient(<ProductCard product={productMock} />);

    const deleteButton = screen.getByRole("button", { name: /Eliminar/i });
    fireEvent.click(deleteButton);

    // Esperar a que aparezca la notificación
    expect(
      await screen.findByText(/Producto "Crédito Empresarial" eliminado/i),
    ).toBeInTheDocument();
  });
});
