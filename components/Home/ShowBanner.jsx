"use client"
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import Image from 'next/image';
import Link from 'next/link';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
const ShowBanner = ({ banners }) => {
    const safeTarget = (value) => {
        if (typeof value !== "string" || /[\s\\\u0000-\u001F\u007F]/u.test(value)) return "#";
        if (/^\/(?!\/)/.test(value)) return value;
        try { const url = new URL(value); return url.protocol === "https:" && !url.username && !url.password ? url.href : "#"; }
        catch { return "#"; }
    };
    const mainBanners = banners.filter(banner => banner.bannerType === 'main');

    return (
        <Swiper modules={[Pagination, Navigation, Autoplay]} loop={mainBanners.length > 1} pagination={{ clickable: true }}
            navigation={mainBanners.length > 1}
            autoplay={{
                delay: 3000,
                disableOnInteraction: false,
            }}
            className="hero-swiper aspect-[23/10] overflow-hidden rounded-lg sm:aspect-[23/9] lg:aspect-[23/8]">
            {mainBanners.map((banner, index) => (
                <SwiperSlide key={banner._id}>
                    <Link
                        href={safeTarget(banner.targetUrl)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative block h-full w-full overflow-hidden rounded-lg bg-[#eef4ff]"
                    >
                        <Image
                            src={banner.bannerURL}
                            alt={banner.bannerType}
                            fill
                            priority={index === 0}
                            sizes="(min-width: 1024px) 70vw, 100vw"
                            className="cursor-pointer object-contain"
                        />
                    </Link>
                </SwiperSlide>
            ))}

        </Swiper>
    );
};

export default ShowBanner;
