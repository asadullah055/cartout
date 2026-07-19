
import Image from "next/image";
import ShowBanner from "./ShowBanner";

async function getBanners() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/banner/get-active-banner`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch banners");
  return res.json();
}
const Hero = async () => {
  const data = await getBanners();
  const banners = data.banners ?? [];
  const sideBanners = banners.filter(banner => banner.bannerType === 'side');

  return (
    <section className="grid gap-4 pt-4 md:gap-5 lg:grid-cols-[2.4fr_1fr]">
      <div className="min-w-0">
        <ShowBanner banners={banners} />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1 md:gap-5">
        {sideBanners.slice(0, 2).map((banner, index) => (
          <a
            key={banner._id ?? index}
            href={banner.targetUrl ?? "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="relative block aspect-[1.72/1] overflow-hidden rounded-lg bg-[#eef4ff]"
          >
            <Image
              src={banner.bannerURL}
              fill
              sizes="(min-width: 1024px) 28vw, (min-width: 768px) 50vw, 100vw"
              alt={banner.bannerType ?? "side banner"}
              className="object-cover"
            />
          </a>
        ))}
      </div>
    </section>
  );
};

export default Hero;
