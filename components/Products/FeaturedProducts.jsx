import ProductCard from "./ProductCard";
async function getProducts() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product/publicProducts`, {
    cache: "no-store",
  });
  const data = await res.json();

  return data;
}


const FeaturedProducts = async () => {

  const { products } = await getProducts();


  return (
    <section className="mx-auto max-w-[1440px] px-1.5 py-3 sm:px-2 lg:px-3">
      <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-3 sm:gap-2 md:grid-cols-4 lg:grid-cols-5">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;
