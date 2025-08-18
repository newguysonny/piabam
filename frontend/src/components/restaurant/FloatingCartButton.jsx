// components/FloatingCartButton.jsx
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "../../context/CartContext";

export default function FloatingCartButton({ onClick }) {
  const { cart } = useCart();
  const itemCount = cart.items.reduce((sum, i) => sum + (i.quantity || 1), 0);

  if (itemCount === 0) return null; // hide if empty

  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 
                 bg-purple-600 hover:bg-purple-700 text-white 
                 px-6 py-3 rounded-full shadow-lg flex items-center gap-2 font-semibold"
    >
      <FaShoppingCart className="text-lg" />
      <span>View Cart</span>
      <span className="bg-white text-purple-600 rounded-full px-2 py-0.5 text-sm font-bold">
        {itemCount}
      </span>
    </button>
  );
}
