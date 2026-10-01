import ProductResults from "@/components/Products/ProductResults";

export const metadata = {
  title: "Products | CartOut",
  description: "Browse and search products available on CartOut.",
};

export default async function ProductsPage({ searchParams }) {
  const params = await searchParams;
  const categoryId = typeof params?.category === "string" ? params.category : "";
  const categoryName =
    typeof params?.categoryName === "string" ? params.categoryName : "";
  const searchQuery = typeof params?.search === "string" ? params.search.trim() : "";

  return (
    <main className="min-h-[60vh] bg-white">
      <ProductResults
        categoryId={categoryId}
        categoryName={categoryName}
        searchQuery={searchQuery}
      />
    </main>
  );
}
