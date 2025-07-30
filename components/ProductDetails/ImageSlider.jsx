"use client";
import { useRef, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import ReactImageZoom from "react-image-zoom";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const images = [
  "/images/001jpeg.jpeg",
  "/images/012.jpg",
  "/images/001jpeg.jpeg",
  "/images/012.jpg",
];

const ImageSlider = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const swiperRef = useRef(null);

  const handleSwiperInit = (swiper) => {
    swiperRef.current = swiper;
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  const handleSlideChange = () => {
    const swiper = swiperRef.current;
    if (swiper) {
      setIsBeginning(swiper.isBeginning);
      setIsEnd(swiper.isEnd);
    }
  };

  const zoomProps = {
    width: 500,
    // height: 500,
    // zoomWidth: 400,
    img: images[selectedIndex],
    zoomPosition: "original",
  };

  return (
    <div className="border overflow-hidden p-3">
      {/* Main Image with Zoom */}
      <div className="w-full h-[300px]  rounded overflow-hidden relative">
        <div className="mx-auto w-[400px] h-[300px] flex items-center">
          <ReactImageZoom {...zoomProps} />
        </div>
      </div>

      {/* Thumbnail Slider */}
      <div className="relative mt-4">
        {/* Prev Arrow */}
        <button
          disabled={isBeginning}
          className={`custom-prev absolute -left-3 top-1/2 -translate-y-1/2 z-10 text-2xl p-2 rounded-full ${
            isBeginning
              ? "cursor-not-allowed opacity-50"
              : "hover:bg-gray-100 hover:cursor-pointer"
          }`}
        >
          <IoIosArrowBack />
        </button>

        <Swiper
          modules={[Navigation]}
          navigation={{
            prevEl: ".custom-prev",
            nextEl: ".custom-next",
          }}
          slidesPerView={5}
          spaceBetween={8}
          allowTouchMove={false}
          onSwiper={handleSwiperInit}
          onSlideChange={handleSlideChange}
        >
          {images.map((img, index) => (
            <SwiperSlide key={index}>
              <img
                src={img}
                alt={`Thumbnail ${index}`}
                onClick={() => setSelectedIndex(index)}
                className={`w-20 h-20 object-contain rounded cursor-pointer transition-all duration-300 `}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Next Arrow */}
        <button
          disabled={isEnd}
          className={`custom-next absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-2xl p-2 rounded-full ${
            isEnd
              ? "cursor-not-allowed opacity-50"
              : "hover:bg-gray-100 hover:cursor-pointer"
          }`}
        >
          <IoIosArrowForward />
        </button>
      </div>
    </div>
  );
};

export default ImageSlider;
