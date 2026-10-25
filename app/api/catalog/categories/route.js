import { getCatalogData } from "@/utils/catalog";

export async function GET() {
  try {
    const data = await getCatalogData("/category/dropdownCategories", "catalog-categories", 300);
    return Response.json(data, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return Response.json({ message: "Unable to load categories. Please try again." }, { status: 502 });
  }
}
