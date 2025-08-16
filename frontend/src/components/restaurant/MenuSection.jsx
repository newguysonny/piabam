const MenuSection = ({ menu, items }) => {
  return (
    <div className="mb-8">
      {/* Section title */}
      <h2 className="text-xl font-bold mb-4">{menu}</h2>

      {/* Items */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex flex-col items-center text-center"
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
