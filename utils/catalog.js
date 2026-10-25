const API_BASE_URL = (
  process.env.NEXT_PUBLIC_API_URL ||
  (process.env.NODE_ENV === "production"
    ? "https://pinwheel-server.vercel.app/api"
    : "http://localhost:8000/api")
).replace(/\/$/, "");

// Shared by the initial server render and the same-origin catalog endpoints.
export async function getCatalogData(path, tag, revalidate) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    next: { revalidate, tags: [tag] },
    signal: AbortSignal.timeout(10000),
  });
  if (!response.ok) {
    const error = new Error("Unable to load catalog data");
    error.status = response.status;
    throw error;
  }
  return response.json();
}

export function getProducts(params = new URLSearchParams({ page: "1", limit: "10" })) {
  return getCatalogData(`/product/publicProducts?${params}`, "catalog-products", 30);
}
