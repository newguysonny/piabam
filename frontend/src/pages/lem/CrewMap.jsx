

/*
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
      /* <div className="relative w-full h-auto"> /
      <div className="flex flex-col h-screen">
        <Navbar />
      {/* Map /}
       <div className="relative" style={{ height: 'calc(100vh - 64px)' }}>
      <MapWrapper>
        {mockCrews.map((crew) => (
          <CrewMarker
            key={crew.id}
            crew={crew}
            onSelect={() => setSelectedCrew(crew)}
          />
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
        
      </div>

     
      {/* Slide-in filter modal /}
      {showFilter && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-40 z-40"
            onClick={() => setShowFilter(false)}
          />
          <MapFilter onClose={() => setShowFilter(false)} />
        </>
      )}

      {/* Crew Preview  Modal /}
      {selectedCrew && (
        <CrewPreview
          crew={selectedCrew}
          onClose={() => setSelectedCrew(null)}
        />
      )}

      
    </div>
    
  );
}

*/










import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import MapWrapper from "../../components/lem/MapWrapper";
import MapFilter from "../../components/lem/MapFilter";
import CrewMarker from "../../components/lem/CrewMarker";
import CrewPreview from "../../components/lem/CrewPreview";
import Navbar from "../../components/Navbar";
import { SlidersHorizontal } from "lucide-react";

const mockCrews= [
    {
      "id": 1,
      "name": "Tomiwa & Friends",
      "avatar": "https://placehold.co/400x400/3b82f6/ffffff?text=T+F",
      "joined": 12,
      "capacity": 30,
      "address": "Yaba Lagos",
      "subtotal": 7200,
      "distance": "1 mile",
      "location": { "lat": 6.5244, "lng": 3.3792 },
      "description": "Hey! Join the Meal Crew – where good food and great vibes come together. Let's eat, share, and enjoy every bite. You in? 🍽️😋"
    },
    {
      "id": 2,
      "name": "Nneka Meal Party",
      "avatar": "https://placehold.co/400x400/10b981/ffffff?text=NMP",
      "joined": 25,
      "capacity": 50,
      "address": "Presto Close, Victoria Island",
      "subtotal": 5200,
      "distance": "0.5 mile",
      "location": { "lat": 6.4551, "lng": 3.3942 },
      "description": "Healthy meal prep for busy professionals. Fresh ingredients, delicious recipes!"
    },
    {
      "id": 3,
      "name": "Lagos Foodies Club",
      "avatar": "https://placehold.co/400x400/ef4444/ffffff?text=LFC",
      "joined": 8,
      "capacity": 20,
      "address": "Ikeja Lagos",
      "subtotal": 8500,
      "distance": "2 miles",
      "location": { "lat": 6.5244, "lng": 3.3792 },
      "description": "Gourmet meals for food enthusiasts. Join us for exclusive culinary experiences!"
    },
    {
      "id": 4,
      "name": "Spice Masters",
      "avatar": "https://placehold.co/400x400/f97316/ffffff?text=SM",
      "joined": 18,
      "capacity": 40,
      "address": "Surulere Lagos",
      "subtotal": 6300,
      "distance": "1.2 miles",
      "location": { "lat": 6.5005, "lng": 3.3581 },
      "description": "Love spicy food? We specialize in fiery dishes from around the world. Bring your heat tolerance!"
    },
    {
      "id": 5,
      "name": "Veggie Delight",
      "avatar": "https://placehold.co/400x400/22c55e/ffffff?text=VD",
      "joined": 15,
      "capacity": 25,
      "address": "GRA Ikeja",
      "subtotal": 6800,
      "distance": "1.8 miles",
      "location": { "lat": 6.5985, "lng": 3.3491 },
      "description": "100% plant-based meals that will make you forget about meat. Healthy, sustainable and delicious!"
    }
  ];

export default function CrewMap() {
  const [showFilter, setShowFilter] = useState(false);
  const [selectedCrew, setSelectedCrew] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  // Check for crew parameter on mount and URL changes
  useEffect(() => {
    const crewId = searchParams.get('crew');
    if (crewId) {
      const crew = mockCrews.find(c => c.id === parseInt(crewId));
      if (crew) {
        setSelectedCrew(crew);
      }
    }
  }, [searchParams]);

  // Handle browser back/forward navigation
  useEffect(() => {
    const handlePopState = () => {
      const crewId = new URLSearchParams(window.location.search).get('crew');
      if (!crewId && selectedCrew) {
        setSelectedCrew(null);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [selectedCrew]);

  const handleCrewSelect = (crew) => {
    setSelectedCrew(crew);
    setSearchParams({ crew: crew.id });
  };

  const handleCloseModal = () => {
    setSelectedCrew(null);
    setSearchParams({});
  };

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      
      {/* Map */}
      <div className="relative" style={{ height: 'calc(100vh - 64px)' }}>
        <MapWrapper>
          {mockCrews.map((crew) => (
            <CrewMarker
              key={crew.id}
              crew={crew}
              onSelect={() => handleCrewSelect(crew)}
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

      {/* Crew Preview Modal */}
      {selectedCrew && (
        <CrewPreview
          crews={mockCrews}
          initialIndex={mockCrews.findIndex(c => c.id === selectedCrew.id)}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}
