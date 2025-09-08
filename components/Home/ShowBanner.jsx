"use client"
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';

import Image from 'next/image';
import Link from 'next/link';
import { Autoplay, Pagination } from 'swiper/modules';
const ShowBanner = ({ banners }) => {
    return (
        <Swiper modules={[Pagination, Autoplay]} loop={true} pagination={{ clickable: true }}
            autoplay={{
                delay: 3000,
                disableOnInteraction: false,
            }}
            className="mySwiper">
            {banners.filter(banner => banner.bannerType === 'main').map((banner) => (
                <SwiperSlide key={banner._id}>
                    <Link href={banner.targetUrl ?? "#"} target="_blank">
                        <Image
                            src={banner.bannerURL}
                            alt={banner.bannerType}
                            height={800}
                            width={1600}
                            className="cursor-pointer"
                        />
                    </Link>
                </SwiperSlide>
            ))}

        </Swiper>
    );
};

export default ShowBanner;