import { getProducts } from "@/utils/catalog";
import RelatedProductsSlider from "./RelatedProductsSlider";

const RELATED_PRODUCTS_LIMIT = 12;

export default async function RelatedProducts({ product }) {
  const categoryId = product?.category?._id;
  if (!categoryId) return null;

  let data;
  try {
    data = await getProducts(new URLSearchParams({
      category: categoryId,
      page: "1",
      // Fetch one extra card because the current product may be in this page.
      limit: String(RELATED_PRODUCTS_LIMIT + 1),
    }));
  } catch {
    // Optional recommendations should not prevent viewing the product details.
    return null;
  }

  const products = (Array.isArray(data?.products) ? data.products : [])
    .filter((item) => item._id !== product._id)
    .slice(0, RELATED_PRODUCTS_LIMIT);

  if (products.length === 0) return null;

  return (
    <RelatedProductsSlider
      products={products}
      categoryId={categoryId}
      categoryName={product.category.name || ""}
    />
  );
}
