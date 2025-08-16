import { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const MenuSection = ({ menu, items }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = direction === "left" ? -clientWidth : clientWidth;
      scrollRef.current.scrollTo({
        left: scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="mb-8 relative">
      {/* Section title + arrows */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">{menu}</h2>
        <div className="flex space-x-2">
          <button
            onClick={() => scroll("left")}
            className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
          >
            <FaChevronLeft size={14} />
          </button>
          <button
            onClick={() => scroll("right")}
            className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
          >
            <FaChevronRight size={14} />
          </button>
        </div>
      </div>

      {/* Scrollable items */}
      <div
        ref={scrollRef}
        className="flex space-x-6 overflow-x-auto scrollbar-hide scroll-smooth"
      >
        {items.map((item) => (
          <div
            key={item.id}
            className="flex-shrink-0 w-32 flex flex-col items-center text-center"
          >
            {/* Image */}
            <div className="relative">
              <img
                src={item.image}
                alt={item.name}
                className="w-28 h-28 object-cover rounded-full shadow-sm"
              />
              {/* Add button */}
              <button className="absolute bottom-1 right-1 bg-white w-8 h-8 rounded-full flex items-center justify-center shadow">
                +
              </button>
            </div>

            {/* Text info */}
            <div className="mt-3">
              <p className="font-medium text-sm">{item.name}</p>
              <p className="text-black font-semibold text-sm">
                ₦{item.price.toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuSection;
