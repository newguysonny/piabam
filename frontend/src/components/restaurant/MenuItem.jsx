import { useCart } from "../../context/CartContext";
export default function MenuItem({ item, onAdd, restaurantId }) {
  const handleAddClick = () => {
    onAdd({ ...item, restaurantId });
  };

  return (
    <div className="flex-shrink-0 w-32 flex flex-col items-center text-center">
      <div className="relative">
        <img
          src={item.image}
          alt={item.name}
          className="w-28 h-28 object-cover rounded-full shadow-sm"
        />
        <button
          onClick={handleAddClick}
          className="absolute bottom-1 right-1 bg-white w-8 h-8 rounded-full flex items-center justify-center shadow"
        >
          +
        </button>
      </div>
      <div className="mt-3">
        <p className="font-medium text-sm">{item.name}</p>
        <p className="text-black font-semibold text-sm">
          ₦{item.price.toLocaleString()}
        </p>
      </div>
    </div>
  );
}

/*
export default function MenuItem({ item, onAdd }) {
  const handleAddClick = () => {
    onAdd(item); // delegate entirely to parent
  };

  return (
    <div className="flex-shrink-0 w-32 flex flex-col items-center text-center">
      {/* Image /}
      <div className="relative">
        <img
          src={item.image}
          alt={item.name}
          className="w-28 h-28 object-cover rounded-full shadow-sm"
        />
        {/* Add button /}
        <button
          onClick={handleAddClick}
          className="absolute bottom-1 right-1 bg-white w-8 h-8 rounded-full flex items-center justify-center shadow"
        >
          +
        </button>
      </div>

      {/* Text info /}
      <div className="mt-3">
        <p className="font-medium text-sm">{item.name}</p>
        <p className="text-black font-semibold text-sm">
          ₦{item.price.toLocaleString()}
        </p>
      </div>
    </div>
  );
}
*/
