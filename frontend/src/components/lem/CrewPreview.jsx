import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CartPreview from "./CartPreview.jsx";

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
      options: [
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
      
      {/* Outer container with margin/padding */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Modal - Updated with margin from corners */}
        <div className="bg-white rounded-2xl shadow-lg w-full max-w-sm max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex justify-between items-center p-4 border-b border-gray-100">
            <h2 className="text-xl font-bold">{crew.name}</h2>
            <button onClick={onClose} className="text-gray-500 text-xl">
              ✕
            </button>
          </div>

          <div className="p-4">
            <img
              src={crew.avatar}
              alt={crew.name}
              className="w-full h-48 object-cover rounded-lg"
            />
            <div className="text-left mt-3">
              <div className="text-xl font-bold text-gray-800">
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
            
            {/* Join Button inside modal */}
            <div className="mt-6 pb-2">
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
          </div>
        </div>
      </div>
    </>
  );
}
