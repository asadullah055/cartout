import { timingSafeEqual } from "node:crypto";
import { revalidateTag } from "next/cache";

export const runtime = "nodejs";

export async function POST(request) {
  const secret = process.env.CATALOG_REVALIDATE_SECRET;
  const supplied = request.headers.get("authorization") || "";
  const expected = `Bearer ${secret}`;
  if (!secret || Buffer.byteLength(supplied) !== Buffer.byteLength(expected) ||
      !timingSafeEqual(Buffer.from(supplied), Buffer.from(expected))) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }
  const body = await request.json().catch(() => null);
  const allowed = new Set(["catalog-products", "catalog-banners", "catalog-categories"]);
  if (!Array.isArray(body?.tags) || !body.tags.length || body.tags.length > allowed.size ||
      body.tags.some((tag) => !allowed.has(tag))) {
    return Response.json({ message: "Invalid cache tags" }, { status: 400 });
  }
  for (const tag of new Set(body.tags)) revalidateTag(tag, { expire: 0 });
  return Response.json({ revalidated: true });
}
