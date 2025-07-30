// src/components/lem/MapFilter.jsx
export default function MapFilter({ onClose }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-2xl p-6 shadow-xl h-[90vh] overflow-y-auto transition-transform transform translate-y-0">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Filter Meal Crews</h2>
        <button
          className="text-gray-500 hover:text-gray-700 text-sm"
          onClick={onClose}
        >
          Close
        </button>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm text-gray-600 mb-1">Price Range</label>
          <input type="range" min="500" max="10000" className="w-full" />
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">Distance (km)</label>
          <input type="range" min="1" max="50" className="w-full" />
        </div>

        {/* Additional filters */}
      </div>

      <div className="mt-10">
        <button className="w-full py-3 rounded-xl bg-black text-white text-center font-semibold">
          Apply Filters
        </button>
      </div>
    </div>
  );
}
