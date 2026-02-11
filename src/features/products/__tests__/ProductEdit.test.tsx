import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { ProductCard } from "../components/ProductCard";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { Product } from "../types";

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

// Creamos un QueryClient para tests
const queryClient = new QueryClient();

describe("ProductCard component", () => {
  const renderWithQueryClient = (ui: React.ReactElement) =>
    render(
      <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>,
    );

  it("muestra la información del producto correctamente", () => {
    renderWithQueryClient(<ProductCard product={productMock} />);

    expect(screen.getByText("Crédito Empresarial")).toBeInTheDocument();
    expect(screen.getByText("Crédito")).toBeInTheDocument();
    expect(screen.getByText(/\$50,000/)).toBeInTheDocument(); // notar el formateo
    expect(screen.getByText("Activo")).toBeInTheDocument();
  });

  it("llama onDelete cuando se elimina", () => {
    window.confirm = jest.fn(() => true); // Simular confirm
    renderWithQueryClient(<ProductCard product={productMock} />);

    const deleteButton = screen.getByRole("button", { name: /Eliminar/i });
    fireEvent.click(deleteButton);
  });
});
