import { useState } from "react";
import MapWrapper from "../../components/lem/MapWrapper";
import MapFilter from "../../components/lem/MapFilter";
import CrewMarker from "../../components/lem/CrewMarker";
import CrewPreview from "../../components/lem/CrewPreview";
import Navbar from "../../components/Navbar";
import { SlidersHorizontal } from "lucide-react";

const mockCrews = [
  {
    id: 1,
    name: "Tomiwa & Friends",
    avatar: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092",
    joined: 12,
    capacity: 30,
    address: "Yaba Lagos",
    subtotal: 7200,
    diatance: "1 mile",
    location: { lat: 6.5244, lng: 3.3792 },
    description: "Hey! Join the Meal Crew – where good food and great vibes come together. Let’s eat, share, and enjoy every bite. You in? 🍽️😋",
  },
  {
    id: 2,
    name: "Nneka Meal Party",
    avatar: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092",
    joined: 25,
    capacity: 50,
    address: " Presto Close, Victoria Island",
    subtotal: 5200,
    distance: "0.5 mile",
    location: { lat: 6.4551, lng: 3.3942 },
    description:" ",
  },
];

export default function CrewMap() {
  const [showFilter, setShowFilter] = useState(false);
  const [selectedCrew, setSelectedCrew] = useState(null);

  return ( 
      /* <div className="relative w-full h-auto"> */
      <div className="flex flex-col h-screen">
        <Navbar />
      {/* Map */}
      <div className="flex-1 relative pt-16">
      <MapWrapper>
        {mockCrews.map((crew) => (
          <CrewMarker
            key={crew.id}
            crew={crew}
            onSelect={() => setSelectedCrew(crew)}
          />
        ))}
      </MapWrapper>

        {/* Filter Button */}
      <button
        className="absolute top-4 right-4 z-40 bg-white rounded-full shadow-md p-2 hover:bg-gray-100 transition"
        title="Filter"
        onClick={() => setShowFilter(true)}
      >
        <SlidersHorizontal className="w-5 h-5 text-gray-700" />
      </button>
      </div>

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
          <div
            className="fixed inset-0 bg-black bg-opacity-40 z-40"
            onClick={() => setShowFilter(false)}
          />
          <MapFilter onClose={() => setShowFilter(false)} />
        </>
      )}

      {/* Crew Preview  Modal */}
      {selectedCrew && (
        <CrewPreview
          crew={selectedCrew}
          onClose={() => setSelectedCrew(null)}
        />
      )}

      
    </div>
    
  );
}












/*
import { useState } from "react";
import MapWrapper from "../../components/lem/MapWrapper";
import MapFilter from "../../components/lem/MapFilter";
import CrewMarker from "../../components/lem/CrewMarker";
import Navbar from "../../components/Navbar";
import { SlidersHorizontal } from "lucide-react";

// 🧪 Mock data for now
const mockCrews = [
  {
    id: 1,
    name: "Tomiwa & Friends",
    avatar: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092",
    joined: 12,
    capacity: 30,
    location: { lat: 6.5244, lng: 3.3792 }, // Lagos
  },
  {
    id: 2,
    name: "Nneka Meal Party",
    avatar: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092",
    joined: 25,
    capacity: 50,
    location: { lat: 6.4551, lng: 3.3942 }, // Victoria Island
  },
];

export default function CrewMap() {
  const [showFilter, setShowFilter] = useState(false);

  return (
    
      
    <div className="relative w-full h-screen">
      
      {/* Map /}
      <MapWrapper>
        {mockCrews.map((crew) => (
          <CrewMarker key={crew.id} crew={crew} />
        ))}
      </MapWrapper>
      
      

      {/* Filter Button /}
      <button
        className="absolute top-4 right-4 z-40 bg-white rounded-full shadow-md p-2 hover:bg-gray-100 transition"
        title="Filter"
        onClick={() => setShowFilter(true)}
      >
        <SlidersHorizontal className="w-5 h-5 text-gray-700" />
      </button>

      {/* Slide-in filter modal /}
      {showFilter && (
        <>
          {/* Overlay /}
          <div
            className="fixed inset-0 bg-black bg-opacity-40 z-40"
            onClick={() => setShowFilter(false)}
          />
          {/* Modal /}
          <MapFilter onClose={() => setShowFilter(false)} />
        </>
      )}
      <Navbar />
    </div>
    
      
  );
}
*/
