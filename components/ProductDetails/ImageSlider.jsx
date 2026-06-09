"use client";
import { useRef, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";


const ZOOM_PREVIEW_WIDTH = 620;
const ZOOM_PREVIEW_HEIGHT = 480;

const ImageSlider = ({ images }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [isZooming, setIsZooming] = useState(false);
  const [zoomStyle, setZoomStyle] = useState({
    backgroundPosition: "center",
    backgroundSize: "240%",
  });
  const imageRef = useRef(null);
  const swiperRef = useRef(null);

  const handleMouseMove = (event) => {
    if (!imageRef.current) return;

    const imageRect = imageRef.current.getBoundingClientRect();
    const x = Math.min(
      imageRect.width,
      Math.max(0, event.clientX - imageRect.left)
    );
    const y = Math.min(
      imageRect.height,
      Math.max(0, event.clientY - imageRect.top)
    );
    const scale = Math.max(
      2.4,
      ZOOM_PREVIEW_WIDTH / imageRect.width + 0.15,
      ZOOM_PREVIEW_HEIGHT / imageRect.height + 0.15
    );
    const backgroundWidth = imageRect.width * scale;
    const backgroundHeight = imageRect.height * scale;
    const backgroundX = Math.min(
      0,
      Math.max(ZOOM_PREVIEW_WIDTH - backgroundWidth, ZOOM_PREVIEW_WIDTH / 2 - x * scale)
    );
    const backgroundY = Math.min(
      0,
      Math.max(ZOOM_PREVIEW_HEIGHT - backgroundHeight, ZOOM_PREVIEW_HEIGHT / 2 - y * scale)
    );

    setZoomStyle({
      backgroundPosition: `${backgroundX}px ${backgroundY}px`,
      backgroundSize: `${backgroundWidth}px ${backgroundHeight}px`,
    });
  };

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
    <div className="relative z-20 overflow-visible rounded-lg border border-gray-200 bg-white p-3 shadow-sm">
      {/* Main Image */}
      <div
        className="relative flex h-[380px] w-full cursor-crosshair items-center justify-center overflow-hidden rounded-md bg-gray-50 p-2"
        onMouseEnter={() => setIsZooming(true)}
        onMouseLeave={() => setIsZooming(false)}
        onMouseMove={handleMouseMove}
      >
        <img
          ref={imageRef}
          src={images[selectedIndex]}
          alt="Selected product"
          className="max-h-full max-w-full object-contain"
        />
      </div>

      {isZooming && (
        <div
          className="pointer-events-none absolute left-[calc(100%+16px)] top-3 z-50 hidden h-[480px] w-[620px] rounded-md border border-gray-200 bg-white bg-no-repeat shadow-xl lg:block"
          style={{
            backgroundImage: `url(${images[selectedIndex]})`,
            backgroundPosition: zoomStyle.backgroundPosition,
            backgroundSize: zoomStyle.backgroundSize,
          }}
        />
      )}

      {/* Thumbnail Slider */}
      <div className="relative mt-4">
        {/* Prev Arrow */}
        <button
          disabled={isBeginning}
          className={`custom-prev absolute -left-3 top-1/2 -translate-y-1/2 z-10 text-2xl p-2 rounded-full ${isBeginning
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
                className={`h-20 w-20 cursor-pointer rounded-md border object-contain p-1 transition-all duration-300 ${
                  selectedIndex === index
                    ? "border-orange-500 shadow-sm"
                    : "border-gray-200 hover:border-orange-200"
                }`}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Next Arrow */}
        <button
          disabled={isEnd}
          className={`custom-next absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-2xl p-2 rounded-full ${isEnd
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
