import "@testing-library/jest-dom";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { ProductAdd } from "../components/ProductAdd";
import { Product } from "../types";

// Mock de useProductsActions para que no necesitemos QueryClient
jest.mock("../hooks/useProductsActions", () => ({
  useProductsActions: () => ({
    addProduct: {
      mutate: jest.fn(
        (form: Product, { onSuccess }: { onSuccess?: () => void }) => {
          // Llama onSuccess automáticamente para simular éxito
          act(() => onSuccess?.());
        },
      ),
    },
    editProduct: { mutate: jest.fn() },
    deleteProduct: { mutate: jest.fn() },
  }),
}));

describe("ProductAdd component", () => {
  it("abre modal, completa formulario y muestra notificación", () => {
    render(<ProductAdd />);

    // 1️⃣ Abrir modal
    const openButton = screen.getByText("+ Agregar Producto");
    fireEvent.click(openButton);

    expect(screen.getByText("Agregar Producto")).toBeInTheDocument();

    // 2️⃣ Completar formulario
    const codeInput = screen.getByPlaceholderText("Código del producto");
    const nameInput = screen.getByPlaceholderText("Nombre del producto");
    const priceInput = screen.getByPlaceholderText("Precio del producto");

    fireEvent.change(codeInput, { target: { value: "001" } });
    fireEvent.change(nameInput, { target: { value: "Producto Test" } });
    fireEvent.change(priceInput, { target: { value: 100 } });

    expect(codeInput).toHaveValue("001");
    expect(nameInput).toHaveValue("Producto Test");
    expect(priceInput).toHaveValue(100);

    // 3️⃣ Cambiar categoría y estado
    const categorySelect = screen.getByLabelText("Categoría");
    const stateSelect = screen.getByLabelText("Estado");

    fireEvent.change(categorySelect, { target: { value: "Cuenta" } });
    fireEvent.change(stateSelect, { target: { value: "false" } });

    expect(categorySelect).toHaveValue("Cuenta");
    expect(stateSelect).toHaveValue("false");

    // 4️⃣ Hacer submit
    const saveButton = screen.getByText("Guardar");
    fireEvent.click(saveButton);

    // 5️⃣ Verificar notificación exitosa
    expect(
      screen.getByText("Producto creado correctamente ✅"),
    ).toBeInTheDocument();

    // 6️⃣ Modal se cierra automáticamente
    expect(screen.queryByText("Agregar Producto")).not.toBeInTheDocument();
  });

  it("cierra modal al hacer click en Cancelar", () => {
    render(<ProductAdd />);
    fireEvent.click(screen.getByText("+ Agregar Producto"));

    const cancelButton = screen.getByText("Cancelar");
    fireEvent.click(cancelButton);

    expect(screen.queryByText("Agregar Producto")).not.toBeInTheDocument();
  });
});
