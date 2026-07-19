import Hero from "@/components/Home/Hero";
import ServiceHighlights from "@/components/Home/ServiceHighlights";
import FeaturedProducts from "@/components/Products/FeaturedProducts";

export default function Home() {
  return (
    <main className="max-w-[1440px] mx-auto">
      <Hero />
      <ServiceHighlights />
      <FeaturedProducts/>
    </main>
  );
}
