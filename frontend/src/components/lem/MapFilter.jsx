// src/components/lem/MapFilter.jsx
import { useEffect } from "react";

export default function MapFilter({ onClose }) {
  // Prevent background scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-end bg-black/40">
      {/* Modal content */}
      <div className="w-full bg-white rounded-t-2xl p-6 shadow-xl h-[90vh] overflow-y-auto transition-transform transform translate-y-0">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Filter Meal Crews</h2>
          <button
            className="text-gray-500 hover:text-gray-700 text-sm"
            onClick={onClose}
          >
            Close
          </button>
        </div>

        {/* Filters */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Price Range
            </label>
            <input type="range" min="500" max="10000" className="w-full" />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Distance (km)
            </label>
            <input type="range" min="1" max="50" className="w-full" />
          </div>
        </div>

        {/* CTA */}
        <div className="mt-10">
          <button className="w-full py-3 rounded-xl bg-black text-white text-center font-semibold">
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}
