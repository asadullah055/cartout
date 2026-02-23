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
    <section className="max-w-[1280px] mx-auto p-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 ">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;
