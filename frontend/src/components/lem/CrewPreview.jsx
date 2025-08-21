import { useEffect, useState, useRef } from "react";
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
  const [isSwiping, setIsSwiping] = useState(false);
  const [swipeOffset, setSwipeOffset] = useState(0);
  const cardRef = useRef(null);

  // Touch start positions
  const startX = useRef(0);
  const startY = useRef(0);
  const isHorizontalSwipe = useRef(false);

  // Prevent background scroll while modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleTouchStart = (e) => {
    startX.current = e.touches[0].clientX;
    startY.current = e.touches[0].clientY;
    isHorizontalSwipe.current = false;
    setIsSwiping(true);
  };

  const handleTouchMove = (e) => {
    if (!isSwiping) return;

    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;
    
    const deltaX = currentX - startX.current;
    const deltaY = currentY - startY.current;
    
    // Calculate angle in degrees (0° = pure horizontal, 90° = pure vertical)
    const angle = Math.abs(Math.atan2(deltaY, deltaX) * 180 / Math.PI);
    
    // If we haven't determined swipe direction yet, check the angle
    if (!isHorizontalSwipe.current) {
      if (angle < 45) {
        // Primarily horizontal swipe - prevent default to avoid scrolling
        isHorizontalSwipe.current = true;
        e.preventDefault();
      } else {
        // Primarily vertical swipe - allow scrolling, don't handle as dismiss
        return;
      }
    }
    
    // If it's a horizontal swipe, update the offset for animation
    if (isHorizontalSwipe.current) {
      setSwipeOffset(deltaX);
    }
  };

  const handleTouchEnd = (e) => {
    if (!isSwiping) return;
    
    setIsSwiping(false);
    
    if (isHorizontalSwipe.current) {
      const currentX = e.changedTouches[0].clientX;
      const deltaX = currentX - startX.current;
      
      // If swiped beyond threshold, close the modal
      if (Math.abs(deltaX) > 100) {
        onClose();
      } else {
        // Return to center if not swiped far enough
        setSwipeOffset(0);
      }
    }
    
    isHorizontalSwipe.current = false;
  };

  // Handle overlay click to close modal
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Calculate transform styles for swipe animation
  const getTransformStyle = () => {
    if (!isSwiping || !isHorizontalSwipe.current) return {};
    
    const rotate = swipeOffset * 0.05; // Rotate based on swipe distance
    const opacity = 1 - Math.abs(swipeOffset) / 300; // Fade out when swiping far
    
    return {
      transform: `translateX(${swipeOffset}px) rotate(${rotate}deg)`,
      opacity: Math.max(0.7, opacity),
      transition: isSwiping ? 'none' : 'transform 0.3s ease, opacity 0.3s ease'
    };
  };

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center p-2"
        onClick={handleOverlayClick}
      >
        {/* Modal container with touch handlers */}
        <div 
          ref={cardRef}
          className="bg-white rounded-2xl shadow-lg w-full max-w-sm max-h-[70vh] overflow-y-auto flex flex-col"
          onClick={(e) => e.stopPropagation()}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={getTransformStyle()}
        >
          {/* Swipe indicator */}
          {isSwiping && isHorizontalSwipe.current && (
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
import { useEffect, useState, useRef } from "react";
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
  const [isSwiping, setIsSwiping] = useState(false);
  const [swipeOffset, setSwipeOffset] = useState(0);
  const cardRef = useRef(null);

  // Touch start positions
  const startX = useRef(0);
  const startY = useRef(0);
  const isHorizontalSwipe = useRef(false);

  // Prevent background scroll while modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleTouchStart = (e) => {
    startX.current = e.touches[0].clientX;
    startY.current = e.touches[0].clientY;
    isHorizontalSwipe.current = false;
    setIsSwiping(true);
    setSwipeOffset(0); // Reset offset when starting new swipe
  };

  const handleTouchMove = (e) => {
    if (!isSwiping) return;

    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;
    
    const deltaX = currentX - startX.current;
    const deltaY = currentY - startY.current;
    
    // Calculate angle in degrees (0° = pure horizontal, 90° = pure vertical)
    const angle = Math.abs(Math.atan2(Math.abs(deltaY), Math.abs(deltaX)) * 180 / Math.PI);
    
    // If we haven't determined swipe direction yet, check the angle
    if (!isHorizontalSwipe.current) {
      if (angle < 45) {
        // Primarily horizontal swipe - prevent default to avoid scrolling
        isHorizontalSwipe.current = true;
        e.preventDefault();
      } else {
        // Primarily vertical swipe - allow scrolling, don't handle as dismiss
        return;
      }
    }
    
    // If it's a horizontal swipe, update the offset for animation
    if (isHorizontalSwipe.current) {
      setSwipeOffset(deltaX);
    }
  };

  const handleTouchEnd = (e) => {
    if (!isSwiping) return;
    
    setIsSwiping(false);
    
    if (isHorizontalSwipe.current) {
      const currentX = e.changedTouches[0].clientX;
      const deltaX = currentX - startX.current;
      
      // If swiped beyond threshold in EITHER direction, close the modal
      if (Math.abs(deltaX) > 100) {
        onClose();
      } else {
        // Return to center if not swiped far enough
        setSwipeOffset(0);
      }
    }
    
    isHorizontalSwipe.current = false;
  };

  // Handle overlay click to close modal
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Calculate transform styles for swipe animation
  const getTransformStyle = () => {
    if (!isSwiping && swipeOffset === 0) return {};
    
    const rotate = swipeOffset * 0.05; // Rotate based on swipe distance
    const opacity = 1 - Math.abs(swipeOffset) / 300; // Fade out when swiping far
    
    return {
      transform: `translateX(${swipeOffset}px) rotate(${rotate}deg)`,
      opacity: Math.max(0.7, opacity),
      transition: isSwiping ? 'none' : 'transform 0.3s ease, opacity 0.3s ease'
    };
  };

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center p-2"
        onClick={handleOverlayClick}
      >
        {/* Modal container with touch handlers */}
        <div 
          ref={cardRef}
          className="bg-white rounded-2xl shadow-lg w-full max-w-sm max-h-[70vh] overflow-y-auto flex flex-col"
          onClick={(e) => e.stopPropagation()}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={getTransformStyle()}
        >
          {/* Swipe indicator */}
          {isSwiping && isHorizontalSwipe.current && (
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
        </div>
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
