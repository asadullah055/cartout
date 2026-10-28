import { getProducts } from "@/utils/catalog";

export async function GET(request) {
  const params = new URL(request.url).searchParams;
  const allowed = new Set(["page", "limit", "category", "brand", "seller", "search", "q"]);
  if ([...params.keys()].some((key) => !allowed.has(key) || params.getAll(key).length > 1)) {
    return Response.json({ message: "Invalid product filters" }, { status: 400 });
  }
  // Normalize the common first page so it shares the server render's cache key.
  if (!params.has("page")) params.set("page", "1");
  if (!params.has("limit")) params.set("limit", "10");
  try {
    const data = await getProducts(params);
    return Response.json(data, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    const status = error.status === 400 ? 400 : 502;
    return Response.json({ message: status === 400 ? "Invalid product filters" : "Unable to load products. Please try again." }, { status });
  }
}
