import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useMotionValue, useTransform } from "framer-motion";
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
  const [isSwiping, setIsSwiping] = useState(false);

  // Motion values for swipe animation
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-15, 15]);
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0]);

  // Prevent background scroll while modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // Handle overlay click to close modal
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Handle swipe end
  const handleDragEnd = (event, info) => {
    setIsSwiping(false);
    
    // If swiped beyond threshold, close the modal
    if (Math.abs(info.offset.x) > 100) {
      onClose();
    }
  };

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center p-2"
        onClick={handleOverlayClick}
      >
        {/* Swipeable Modal container */}
        <motion.div 
          className="bg-white rounded-2xl shadow-lg w-full max-w-sm max-h-[70vh] overflow-y-auto flex flex-col"
          onClick={(e) => e.stopPropagation()}
          drag="x" // Enable horizontal dragging
          dragConstraints={{ left: 0, right: 0 }} // Keep centered when not actively dragging
          onDragStart={() => setIsSwiping(true)}
          onDragEnd={handleDragEnd}
          style={{ x, rotate, opacity }}
          whileTap={{ cursor: "grabbing" }}
        >
          {/* Swipe indicator */}
          {isSwiping && (
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-70 text-white px-3 py-1 rounded-full text-sm">
              Swipe to dismiss
            </div>
          )}

          {/* Header */}
          <div className="flex justify-between items-center p-4 border-b border-gray-100">
            <h2 className="text-xl font-bold">{crew.name}</h2>
            <button onClick={onClose} className="text-gray-500 text-xl">
              ✕
            </button>
          </div>

          {/* Scrollable content area */}
          <div className="p-4 flex-1 overflow-y-auto">
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
          </div>
          
          {/* Fixed Join Button at bottom of modal */}
          <div className="sticky bottom-0 bg-white border-t border-gray-100 p-4">
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
        </motion.div>
      </div>
    </>
  );
}





/*
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

  // Handle overlay click to close modal
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <>
      {/* Overlay - now handles click to close /}
      <div
        className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center p-2"
        onClick={handleOverlayClick}
      >
        {/* Modal container - STOP event propagation so clicks inside don't close modal /}
        <div 
          className="bg-white rounded-2xl shadow-lg w-full max-w-sm max-h-[70vh] overflow-y-auto flex flex-col"
          onClick={(e) => e.stopPropagation()} // This prevents clicks inside from closing modal
        >
          {/* Header /}
          <div className="flex justify-between items-center p-4 border-b border-gray-100">
            <h2 className="text-xl font-bold">{crew.name}</h2>
            <button onClick={onClose} className="text-gray-500 text-xl">
              ✕
            </button>
          </div>

          {/* Scrollable content area /}
          <div className="p-4 flex-1 overflow-y-auto">
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

            {/* Progress Bar /}
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
          
          {/* Fixed Join Button at bottom of modal /}
          <div className="sticky bottom-0 bg-white border-t border-gray-100 p-4">
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
    </>
  );
}
*/
