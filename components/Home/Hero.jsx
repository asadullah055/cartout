
import Image from "next/image";
import ShowBanner from "./ShowBanner";

async function getBanners() {
  const res = await fetch("https://pinwheel-server.vercel.app/api/banner/get-active-banner", {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch banners");
  return res.json();
}
const Hero = async () => {
  const data = await getBanners();
  const banners = data.banners;
  const sideBanners = banners.filter(banner => banner.bannerType === 'side');

  return (
    <div className="flex flex-wrap ">
      <div className="w-[67%] p-1">
        <ShowBanner banners={banners} />
      </div>
      <div className="w-[33%] p-1 flex flex-col justify-center items-center gap-2">
        <Image src={sideBanners[0]?.bannerURL} height={260} width={800} alt={sideBanners[0]?.bannerType} />
        <Image src={sideBanners[1]?.bannerURL} height={260} width={800} alt={sideBanners[1]?.bannerType} />
      </div>
    </div>
  );
};

export default Hero;
