import { products } from "./data.js";
import ProductCard from "./ProductCard";
const FeaturedProducts = () => {
  return (
    <section className="max-w-[1280px] mx-auto p-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 ">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;
