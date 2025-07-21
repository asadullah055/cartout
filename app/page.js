import Feature from "@/components/Home/Feature";
import Hero from "@/components/Home/Hero";
import FeaturedProducts from "@/components/Products/FeaturedProducts";

export default function Home() {
  return (
    <main className="max-w-[1280px] mx-auto">
      <Hero />
      <Feature/>
      <FeaturedProducts/>
    </main>
  );
}
