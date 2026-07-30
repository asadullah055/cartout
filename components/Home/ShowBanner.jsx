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
                        href={banner.targetUrl ?? "#"}
                        target="_blank"
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
