import Hero from "@/components/Home/Hero";
import ServiceHighlights from "@/components/Home/ServiceHighlights";
import FeaturedProducts from "@/components/Products/FeaturedProducts";
import { getCatalogData, getProducts } from "@/utils/catalog";

export const revalidate = 30;

export default async function Home() {
  // Failed upstream requests are not cached; the client can retry if necessary.
  const [initialData, banners] = await Promise.all([
    getProducts().catch(() => null),
    getCatalogData("/banner/get-active-banner", "catalog-banners", 300).catch(() => ({ banners: [] })),
  ]);
  return (
    <main className="max-w-[1440px] mx-auto">
      <Hero data={banners} />
      <ServiceHighlights />
      <FeaturedProducts initialData={initialData} />
    </main>
  );
}
