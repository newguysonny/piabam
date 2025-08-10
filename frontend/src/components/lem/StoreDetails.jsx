import { useState } from "react";
import { FaStore, FaWalking, FaClock } from "react-icons/fa";

export default function StoreDetails() {
  const [mode, setMode] = useState("pickup"); // pickup | delivery

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      {/* Delivery / Pickup Toggle */}
      <div className="flex bg-gray-100 rounded-full p-1 mb-4">
        {/* Delivery */}
        <div className="flex-1 flex flex-col items-center">
          <button
            disabled
            onClick={() => setMode("delivery")}
            className={`w-full py-2 rounded-full font-medium cursor-not-allowed text-gray-400`}
          >
            Delivery
          </button>
          <span className="text-[10px] text-gray-400 -mt-1">
            Coming Soon
          </span>
        </div>

        {/* Pickup */}
        <div className="flex-1 flex flex-col items-center">
          <button
            onClick={() => setMode("pickup")}
            className={`w-full py-2 rounded-full font-medium ${
              mode === "pickup"
                ? "bg-white shadow"
                : "text-gray-500 hover:bg-gray-200"
            }`}
          >
            Pickup
          </button>
        </div>
      </div>

      {/* Store Info */}
      <div className="flex items-start gap-3 mb-4">
        <FaStore className="text-xl mt-1" />
        <div>
          <h2 className="font-bold text-lg">Wawa 5146</h2>
          <p className="text-gray-500 text-sm">7408 E. Hillsborough Ave.</p>
        </div>
      </div>

      <hr className="my-3" />

      {/* Distance */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <FaWalking className="text-lg" />
          <span className="font-medium">Distance</span>
        </div>
        <span className="text-gray-600 text-sm">0.9 miles</span>
      </div>

      <hr className="my-3" />

      {/* Pickup Time */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FaClock className="text-lg" />
          <span className="font-medium">Pickup time</span>
        </div>
        <span className="text-gray-600 text-sm">7-17 min</span>
      </div>
    </div>
  );
}
