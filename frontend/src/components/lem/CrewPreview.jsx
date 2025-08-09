
export default function CrewPreview({ crew, onClose }) {
  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-40 z-50"
        onClick={onClose}
      />
      {/* Modal */}
      <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl p-4 z-50 shadow-lg max-h-[80vh] overflow-y-auto">
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
        <p className="mt-3 text-gray-600">
          {crew.joined}/{crew.capacity} joined
        </p>
        {/* Add your crew details, join button, etc. */}
        {/* Fixed Join Button */}
          <div className="sticky bottom-0 left-0 right-0 bg-white py-3 mt-4">
            <button className="w-full bg-black text-white py-3 rounded-xl font-semibold hover:opacity-90">
              Join Crew
            </button>
          </div>
      </div>
    </>
  );
}




/*
import Cart from "./Cart.jsx";
import { FiMapPin } from "react-icons/fi";
import { FaUsers } from "react-icons/fa";
import { BsClock } from "react-icons/bs";

export default function CrewPreview({ crew, onClose }) {
  if (!crew) return null;

  const progress = (crew.joined / crew.capacity) * 100;

  return (
    <>
      {/* Overlay /}
      <div
        className="fixed inset-0 bg-black bg-opacity-40 z-50"
        onClick={onClose}
      />

      {/* Centered Modal /}
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl p-4 w-full max-w-md shadow-lg relative max-h-[90vh] overflow-y-auto">
          {/* Close Button /}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl"
          >
            ✕
          </button>

          {/* Header /}
          <h2 className="text-xl font-bold mb-3">{crew.name}</h2>

          {/* Image /}
          <img
            src={crew.avatar}
            alt={crew.name}
            className="w-full h-48 object-cover rounded-lg"
          />

          {/* Crew Info /}
          <p className="mt-3 text-gray-600 flex items-center gap-1">
            <FaUsers className="text-gray-500" /> {crew.joined}/{crew.capacity} joined
          </p>
          <p className="text-xs text-gray-500 flex items-center gap-1">
            <FiMapPin /> {crew.address}
          </p>
          <p className="text-xs text-gray-500 flex items-center gap-1">
            <BsClock /> {crew.distance}
          </p>

          {/* Meals & Price /}
          <p className="text-xs text-gray-500 mt-2">
            {crew.menu.length} meals • ₦{crew.subtotal}
          </p>
          <div className="text-right font-bold text-lg mt-1">
            ₦{crew.subtotal} <span className="text-xs text-gray-500 block">30% discount on checkout</span>
          </div>

          {/* Progress Bar /}
          <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
            <div
              className="bg-green-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          {/* Joined Count /}
          <div className="mt-2 text-gray-600 text-sm">
            {crew.joined} joined / {crew.capacity} capacity
          </div>

          {/* Cart 
          <div className="mt-4">
            <Cart />
          </div> */}

          {/* Fixed Join Button /}
          <div className="sticky bottom-0 left-0 right-0 bg-white py-3 mt-4">
            <button className="w-full bg-black text-white py-3 rounded-xl font-semibold hover:opacity-90">
              Join Crew
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
