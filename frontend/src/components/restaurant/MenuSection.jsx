import { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import MenuItem from "./MenuItem";

const MenuSection = ({ menu, items, restaurantId, onAdd }) => {
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
    <div className="mb-8 mt-4 p-4 relative">
      {/* Section title + arrows */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">{menu}</h2>
        <div className="flex space-x-2">
          <button
            onClick={() => scroll("left")}
            className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
          >
            <FaChevronLeft size={14} className="text-purple-500 hover:text-purple-600" />
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
          <MenuItem key={item.id} item={item} onAdd={onAdd}  restaurantId={restaurantId}  />
        ))}
      </div>
    </div>
  );
};

export default MenuSection;
