import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cart from "./CartPreview.jsx";


const crewCart = {
  items: [
    {
      id: 1,
      name: "Sweet Chipotle BBQ Sauce",
      price: 1000, // in Naira
      quantity: 1,
      image: "https://source.unsplash.com/80x80/?sauce",
      customizations: [],
    },
    {
      id: 2,
      name: "Sweet Chipotle BBQ Crispy Chicken Wrap",
      price: 5700, // in Naira
      quantity: 1,
      image: "https://source.unsplash.com/80x80/?burrito",
      customizations: [
        "Cheese",
        "Lettuce",
        "Pico De Gallo",
        "Purple Cabbage",
        "Spicy Ranch",
        "Sweet Chipotle BBQ Sauce",
      ],
    },
  ],
  subtotal: 6700, // coming from DB
};

export default function CrewPreview({ crew, onClose }) {
  const navigate = useNavigate();
  const progress = (crew.joined / crew.capacity) * 100;

  // Prevent background scroll while modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-40 z-50"
        onClick={onClose}
      />
      {/* Modal */}
      <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl p-4 z-50 shadow-lg max-h-[80vh] overflow-y-auto pb-24">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">{crew.name}</h2>
          <button onClick={onClose} className="text-gray-500">
            ✕
          </button>
        </div>

        <img
          src={crew.avatar}
          alt={crew.name}
          className="w-full h-48 object-cover rounded-lg mt-3"
        />
        <div className="text-left">
          <div className="text-xl mt-2 font-bold text-gray-800">
            ₦{crew.subtotal.toLocaleString()}
          </div>
          <div className="text-sm text-gray-500">30% discount on checkout</div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
          <div
            className="bg-green-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="mt-3 text-gray-600">
          {crew.joined}/{crew.capacity} joined
        </p>

        <div className="mt-4 mb-3">
          <span className="font-bold text-lg">Description</span>
          <p className="mt-3 text-gray-600">{crew.description}</p>
        </div>

        <CartPreview />
      </div>

      {/* Fixed Join Button (always visible) */}
      <div className="fixed bottom-0 left-0 right-0 bg-white py-3 px-4 z-[60] shadow-md">
        <button
          onClick={() => {
            onClose(); // close modal
            navigate("/checkout"); // navigate to checkout
          }}
          className="w-full bg-black text-white py-3 rounded-xl font-semibold hover:opacity-90"
        >
          Join Crew
        </button>
      </div>
    </>
  );
}
