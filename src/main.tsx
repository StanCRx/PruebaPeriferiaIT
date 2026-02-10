import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Providers from "./app/providers";
import { RouterProvider } from "react-router";
import { router } from "./app/router";

async function enableMocking() {
  if (import.meta.env.DEV) {
    const { worker } = await import("./mocks/browser");
    console.log("MSW: worker importado", worker);
    await worker.start();
    console.log("MSW: iniciado");
  }
}

enableMocking().then(() => {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <Providers>
        <RouterProvider router={router} />
      </Providers>
    </StrictMode>,
  );
});
