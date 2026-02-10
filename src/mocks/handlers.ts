import { http, HttpResponse, delay } from "msw";
import rawProducts from "./products.json";
import type { Product } from "../features/products/types";

const products = rawProducts as Product[];

let db: Product[] = [...products];

type CreateProductDTO = Omit<Product, "id" | "reg_date" | "mod_date">;

export const handlers = [
  http.get("/api/products", async ({ request }) => {
    await delay(600);
    const url = new URL(request.url);
    const q = url.searchParams.get("q")?.toLowerCase() ?? "";
    const category = url.searchParams.get("category");
    const state = url.searchParams.get("state");

    let data = [...db];

    if (q) data = data.filter((p) => p.name.toLowerCase().includes(q));
    if (category) data = data.filter((p) => p.category === category);
    if (state !== null) data = data.filter((p) => String(p.state) === state);

    return HttpResponse.json(data);
  }),

  http.get("/api/products/:id", async ({ params }) => {
    await delay(400);
    const id = Number(params.id);
    const item = db.find((p) => p.id === id);

    return item
      ? HttpResponse.json(item)
      : HttpResponse.json({ message: "Not found" }, { status: 404 });
  }),

  http.post("/api/products", async ({ request }) => {
    await delay(700);

    const body = (await request.json()) as CreateProductDTO;

    const newItem: Product = {
      ...body,
      id: Date.now(),
      reg_date: new Date().toISOString(),
      mod_date: null,
    };

    db.push(newItem);

    return HttpResponse.json(newItem, { status: 201 });
  }),

  http.put("/api/products/:id", async ({ request, params }) => {
    await delay(700);

    const id = Number(params.id);
    const body = (await request.json()) as Partial<CreateProductDTO>;

    db = db.map((p) =>
      p.id === id ? { ...p, ...body, mod_date: new Date().toISOString() } : p,
    );

    const updated = db.find((p) => p.id === id);

    return updated
      ? HttpResponse.json(updated)
      : HttpResponse.json({ message: "Not found" }, { status: 404 });
  }),

  http.delete("/api/products/:id", async ({ params }) => {
    await delay(500);

    const id = Number(params.id);
    const exists = db.some((p) => p.id === id);

    db = db.filter((p) => p.id !== id);

    return exists
      ? HttpResponse.json({ ok: true })
      : HttpResponse.json({ message: "Not found" }, { status: 404 });
  }),
];
