import React from "react";
import { FiMapPin } from "react-icons/fi";
import { FaUsers } from "react-icons/fa";
import { BsClock } from "react-icons/bs";
import Cart from "../../components/lem/Cart";
import Checkout from "../../components/lem/Checkout";

const mockCrew = {
  name: "Nneka & Friends Meal Crew",
  avatar: "/avatars/crew.png",
  menu: [],
  subtotal: 7200,
  location: "Yaba, Lagos",
  distance: "1 mile",
  joined: 10,
  capacity: 30,
  status: "Closed",
  availableAt: "9:00AM",
};


export default function CrewPreviewCard({ crew = mockCrew }) {
  const progress = (crew.joined / crew.capacity) * 100;

  return (
    <div className="max-w-sm mx-auto bg-white rounded-2xl shadow-lg p-4 space-y-4 border border-gray-200">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src={crew.avatar}
            alt={crew.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <h2 className="text-lg font-bold text-gray-800">{crew.name}</h2>
            <p className="text-xs text-gray-500">
              {crew.menu.length} meals • ₦{crew.subtotal}
            </p>
            <p className="text-xs text-gray-500 flex items-center gap-1">
              <FiMapPin className="inline text-gray-500" /> {crew.location}
            </p>
            <p className="text-xs text-gray-500 flex items-center gap-1">
              <FiMapPin className="inline text-gray-500" /> {crew.distance}
            </p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-xl font-bold text-gray-800">
            {crew.joined}/{crew.capacity}
          </div>
          <div className="text-xs text-gray-500">joined</div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-green-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        ></div>
        <div className="text-sm text-gray-600">
          {crew.joined} joined / {crew.capacity} total
        </div>
      </div>
      
          <div className="h-2" />{/*<div className="h-2" /> Spacer for vertical gap */}
      
      {/* Status */}
      <div className="text-sm mt-3 text-gray-700 flex items-center gap-2">
        <BsClock className="text-gray-600" />
        <span
          className={
            crew.status === "Closed"
              ? "text-red-600 font-medium"
              : "text-green-600 font-medium"
          }
        >
          {crew.status}
        </span>
        {" • "}
        <span className="font-semibold text-gray-800">
          {crew.availableAt}
        </span>
      </div>

      {/* Cart (Optional) */}
      <Cart />
      <Checkout subtotal={7200} escrowFee={1700} discount={500} />

      {/* Actions */}
      <div className="space-y-2">
        <button className="w-full bg-black text-white py-2 rounded-xl font-semibold hover:opacity-90">
          Join Crew
        </button>
        <button className="w-full bg-gray-100 text-gray-800 py-2 rounded-xl font-semibold hover:bg-gray-200">
          View Details
        </button>
      </div>
    </div>
  );
}

