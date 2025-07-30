import MapWrapper from "../../components/lem/MapWrapper";
import MapFilter from "../../components/lem/MapFilter";
import { useState } from "react";
import { SlidersHorizontal } from "lucide-react";


export default function CrewMap() {
  const [showFilter, setShowFilter] = useState(false);

  return (
    <div className="relative w-full h-screen">
      <MapWrapper />

      {/* Filter Button */}
      <button
        className="absolute top-4 right-4 z-40 bg-white rounded-full shadow-md p-2 hover:bg-gray-100 transition"
        title="Filter"
        onClick={() => setShowFilter(true)}
      >
        <SlidersHorizontal className="w-5 h-5 text-gray-700" />
      </button>

      {/* Slide-in filter modal */}
      {showFilter && (
        <>
          {/* Dimmed overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-40 z-40"
            onClick={() => setShowFilter(false)}
          />

          {/* Filter Panel */}
          <MapFilter onClose={() => setShowFilter(false)} />
        </>
      )}
    </div>
  );
}
