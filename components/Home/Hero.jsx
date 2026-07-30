
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
  const sideBanner = sideBanners[0];

  return (
    <section className="grid gap-4 pt-4 md:gap-5 lg:grid-cols-[2.6fr_1fr] lg:items-stretch">
      <div className="min-w-0">
        <ShowBanner banners={banners} />
      </div>
      {sideBanner ? (
        <div className="min-w-0">
          <a
            href={sideBanner.targetUrl ?? "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="relative block h-[220px] overflow-hidden rounded-lg bg-[#eef4ff] sm:h-[280px] md:h-[320px] lg:h-[360px]"
          >
            <Image
              src={sideBanner.bannerURL}
              fill
              sizes="(min-width: 1024px) 30vw, (min-width: 768px) 50vw, 100vw"
              alt={sideBanner.bannerType ?? "side banner"}
              className="object-cover"
            />
          </a>
        </div>
      ) : null}
    </section>
  );
};

export default Hero;
