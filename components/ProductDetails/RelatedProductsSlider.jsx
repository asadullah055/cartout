"use client";

import Link from "next/link";
import { useId, useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { A11y, Keyboard } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ProductCard from "@/components/Products/ProductCard";
import styles from "./RelatedProductsSlider.module.css";
import "swiper/css";

export default function RelatedProductsSlider({ products, categoryId, categoryName }) {
  const sliderRef = useRef(null);
  const sliderId = useId();
  const headingId = useId();
  const [navigation, setNavigation] = useState({ beginning: true, end: products.length <= 2 });

  const syncNavigation = (swiper) => {
    setNavigation({
      beginning: swiper.isBeginning || swiper.isLocked,
      end: swiper.isEnd || swiper.isLocked,
    });
  };

  return (
    <section aria-labelledby={headingId} className="mt-8 border-t border-[#e4e7ec] px-2 pb-8 pt-6 sm:px-3">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 id={headingId} className="text-xl font-bold text-[#101828] sm:text-2xl">
            Related Products
          </h2>
          {categoryName ? <p className="mt-1 text-sm text-[#667085]">More from {categoryName}</p> : null}
        </div>
        <div className="flex items-center gap-2">
          <Link
            href={`/products?${new URLSearchParams({ category: categoryId, categoryName })}`}
            className="mr-2 text-sm font-semibold text-[#4169e1] no-underline hover:no-underline"
          >
            View all
          </Link>
          <button
            type="button"
            aria-label="Previous related products"
            aria-controls={sliderId}
            disabled={navigation.beginning}
            onClick={() => sliderRef.current?.slidePrev()}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-700 hover:border-orange-300 hover:bg-orange-50 disabled:opacity-40"
          >
            <FiChevronLeft size={20} aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label="Next related products"
            aria-controls={sliderId}
            disabled={navigation.end}
            onClick={() => sliderRef.current?.slideNext()}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-700 hover:border-orange-300 hover:bg-orange-50 disabled:opacity-40"
          >
            <FiChevronRight size={20} aria-hidden="true" />
          </button>
        </div>
      </div>
      <Swiper
        id={sliderId}
        modules={[A11y, Keyboard]}
        slidesPerView={2}
        spaceBetween={8}
        breakpoints={{
          640: { slidesPerView: 3, spaceBetween: 10 },
          768: { slidesPerView: 4, spaceBetween: 12 },
          1024: { slidesPerView: 5, spaceBetween: 12 },
        }}
        keyboard={{ enabled: true, onlyInViewport: true }}
        watchOverflow
        onSwiper={(swiper) => {
          sliderRef.current = swiper;
          syncNavigation(swiper);
        }}
        onSlideChange={syncNavigation}
        onResize={syncNavigation}
        onUpdate={syncNavigation}
        onLock={syncNavigation}
        onUnlock={syncNavigation}
        className={styles.slider}
      >
        {products.map((item) => (
          <SwiperSlide key={item._id}>
            <ProductCard product={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
