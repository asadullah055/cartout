import DeliveryInfo from "@/components/ProductDetails/DeliveryInfo";
import Details from "@/components/ProductDetails/Details";
import ImageSlider from "@/components/ProductDetails/ImageSlider";
import SellerInfo from "@/components/ProductDetails/SellerInfo";
const ProductDetails = () => {
  return (
    <div className="max-w-[1280px] mx-auto mt-2">
      <div className="grid grid-cols-1 sm:grid-col-3  lg:grid-cols-7 sm:grid-cols-2 md:grid-cols-5   gap-2">
        <div className="col-span-1 md:col-span-2 ">
          <ImageSlider />
        </div>
        <div className="col-span-1 md:col-span-3 ">
          {/* <ProductDetails /> */}
          <Details />
        </div>
        <div className="col-span-1 sm:col-span-2 md:col-span-12 lg:col-span-2  bg-[#FAFAFA]">
          <DeliveryInfo />
          <SellerInfo/>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
