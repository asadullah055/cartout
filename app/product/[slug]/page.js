import DeliveryInfo from "@/components/ProductDetails/DeliveryInfo";
import Details from "@/components/ProductDetails/Details";
import ImageSlider from "@/components/ProductDetails/ImageSlider";
import ProductTabs from "@/components/ProductDetails/ProductTabs";
import SellerInfo from "@/components/ProductDetails/SellerInfo";

// 🔹 SERVER SIDE DATA FETCH
async function getProduct(slug) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/product/slug/${slug}`,
    {
      cache: "no-store", // 👈 always fresh (SSR)
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch product");
  }

  return res.json();
}

const ProductDetails = async ({ params }) => {
  const { slug } = params; // ✅ server side params
  const {product} = await getProduct(slug);

  return (
    <div className="max-w-[1280px] mx-auto mt-2">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 lg:grid-cols-7 gap-2">
        
        <div className="col-span-1 md:col-span-2">
          <ImageSlider images={product.images} />
        </div>

        <div className="col-span-1 md:col-span-3">
          <Details product={product} />
        </div>

        <div className="col-span-1 sm:col-span-2 md:col-span-12 lg:col-span-2 bg-[#FAFAFA]">
          <DeliveryInfo product={product} />
          <SellerInfo seller={product.seller} />
        </div>

      </div>
      {/* 3 button description, review,  product question*/}
     {/*  <div className="mt-4">
        <ProductDescription html={product.description} />
      </div> */}
      <ProductTabs product={product} />
    </div>
  );
};

export default ProductDetails;
