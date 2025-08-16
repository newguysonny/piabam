// src/components/restaurant/MenuSection.jsx
import { FiPlus, FiMinus } from "react-icons/fi";

export default function MenuSection({ menu, items }) {
  return (
    <div className="px-4 py-6">
      {/* Menu title */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">{menu}</h2>
        <button className="text-gray-500 hover:text-gray-700">
          <span className="sr-only">View all</span> →
        </button>
      </div>

      {/* Items grid */}
      <div className="flex space-x-4 overflow-x-auto no-scrollbar">
        {items.map((item) => (
          <div
            key={item.id}
            className="min-w-[180px] bg-white rounded-2xl shadow-sm border border-gray-200"
          >
            {/* Image */}
            <div className="relative">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-28 object-cover rounded-t-2xl"
              />
              <button className="absolute bottom-2 right-2 bg-white rounded-full shadow-md w-8 h-8 flex items-center justify-center">
                {item.added ? (
                  <FiMinus className="text-black" />
                ) : (
                  <FiPlus className="text-black" />
                )}
              </button>
            </div>

            {/* Info */}
            <div className="p-3">
              <p className="text-sm font-medium">{item.name}</p>
              <p className="text-gray-600 text-sm">${item.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
