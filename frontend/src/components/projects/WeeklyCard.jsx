import React, { useRef, useState, useEffect } from "react";

const WeeklyCard = ({ title = "New on Lem", items = [] }) => {
  const carouselRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Scroll to selected card
  const scrollToIndex = (index) => {
    if (carouselRef.current && carouselRef.current.children[index]) {
      carouselRef.current.scrollTo({
        left:
          carouselRef.current.children[index].offsetLeft -
          carouselRef.current.offsetLeft,
        behavior: "smooth",
      });
    }
  };

  // Update active index on scroll
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const onScroll = () => {
      const scrollPos = carousel.scrollLeft + carousel.offsetWidth / 2;
      for (let i = 0; i < carousel.children.length; i++) {
        const item = carousel.children[i];
        if (
          item.offsetLeft <= scrollPos &&
          item.offsetLeft + item.offsetWidth > scrollPos
        ) {
          setActiveIndex(i);
          break;
        }
      }
    };

    carousel.addEventListener("scroll", onScroll);
    return () => carousel.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="my-6">
      <h2 className="text-lg font-bold mb-4">{title}</h2>

      {/* Carousel container */}
      <div className="relative">
        <div
          ref={carouselRef}
          className="flex overflow-x-auto scroll-snap-x gap-4 pb-5 no-scrollbar"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {items.map((item, idx) => (
            <div
              key={idx}
              className="scroll-snap-start min-w-[180px] w-[180px] bg-white rounded-lg overflow-hidden shadow transition-transform hover:-translate-y-1"
            >
              <div
                className="h-[240px] bg-gray-200 bg-center bg-cover"
                style={{ backgroundImage: `url(${item.image})` }}
              ></div>
              <div className="p-3">
                <div className="font-bold mb-1 text-sm truncate">
                  {item.title}
                </div>
                <div className="text-gray-500 text-xs">{item.category}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation dots */}
        <div className="flex justify-center gap-2 mt-3">
          {items.map((_, idx) => (
            <div
              key={idx}
              onClick={() => scrollToIndex(idx)}
              className={`w-3 h-3 rounded-full cursor-pointer transition-colors ${
                activeIndex === idx ? "bg-gray-600" : "bg-red-500"
              }`}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeeklyCard;
