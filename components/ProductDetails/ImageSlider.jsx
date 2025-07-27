"use client";
import { useRef, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const images = [
  "/images/001.jpg",
  "/images/001jpeg.jpeg",
  "/images/001.jpg",
  "/images/001jpeg.jpeg",
  "/images/001.jpg",
  "/images/001jpeg.jpeg",
];

const ImageSlider = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
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

  return (
    <div className="">
      {/* Main Image */}
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={(e) => {
          setIsHovered(false);
          e.currentTarget.style.backgroundPosition = "center";
        }}
        onMouseMove={(e) => {
          if (!isHovered) return;
          const { left, top, width, height } =
            e.currentTarget.getBoundingClientRect();
          const x = ((e.clientX - left) / width) * 100;
          const y = ((e.clientY - top) / height) * 100;
          e.currentTarget.style.backgroundPosition = `${x}% ${y}%`;
        }}
        className="w-full h-96 border rounded overflow-hidden relative cursor-zoom-in transition-all duration-200 ease-in-out"
        style={{
          backgroundImage: `url(${images[selectedIndex]})`,
          backgroundSize: isHovered ? "150%" : "100%",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundColor: "#fff",
        }}
      >
        {/* <img
          src={images[selectedIndex]}
          alt="Selected"
          className="w-full h-full object-contain opacity-0"
        /> */}
      </div>

      {/* Thumbnail Slider */}
      <div className="relative mt-4">
        {/* Custom Prev Arrow */}
        <button
          disabled={isBeginning}
          className={`custom-prev absolute -left-3 top-1/2 -translate-y-1/2 z-10 text-2xl   p-2 rounded-full ${
            isBeginning
              ? " cursor-not-allowed"
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
          className="pl-8 pr-8"
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

        {/* Custom Next Arrow */}
        <button
          disabled={isEnd}
          className={`custom-next  absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-2xl  p-2 rounded-full ${
            isEnd
              ? "cursor-not-allowed"
              : "hover:bg-gray-200 hover:cursor-pointer"
          }`}
        >
          <IoIosArrowForward />
        </button>
      </div>
    </div>
  );
};

export default ImageSlider;
