import React, { useState, useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default function CrewForm() {
  const [form, setForm] = useState({
    crewName: "",
    mealType: "",
    mealDesc: "",
    location: "",
    datetime: "",
    crewSize: "",
    mealSource: "home",
    restaurant: "",
    price: "",
    deliveryOption: "home",
    isPrivate: false,
    allowChat: false,
  });
  
  const [locationText, setLocationText] = useState("Unknown location");
  const [locationTime, setLocationTime] = useState("");
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  // Initialize map
  useEffect(() => {
    mapRef.current = L.map("map").setView([6.5244, 3.3792], 13);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors"
    }).addTo(mapRef.current);

    mapRef.current.on("click", (e) => {
      const { lat, lng } = e.latlng;
      updateLocation(lat, lng);
    });

    return () => mapRef.current.remove();
  }, []);

  const updateLocation = (lat, lng) => {
    const latLngStr = `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
    setForm(prev => ({ ...prev, location: latLngStr }));
    
    if (markerRef.current) {
      markerRef.current.setLatLng([lat, lng]);
    } else {
      markerRef.current = L.marker([lat, lng]).addTo(mapRef.current);
    }
  };

  const handleSyncLocation = async () => {
  if (!navigator.geolocation) {
    alert("Geolocation not supported by your browser.");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const { latitude: lat, longitude: lng } = position.coords;
      
      // Update form state
      setForm(prev => ({ ...prev, location: `${lat.toFixed(6)}, ${lng.toFixed(6)}` }));

      // Update map view and marker
      if (!mapRef.current) {
        mapRef.current = L.map("map").setView([lat, lng], 15);
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(mapRef.current);
      } else {
        mapRef.current.setView([lat, lng], 15);
      }

      if (markerRef.current) {
        markerRef.current.setLatLng([lat, lng]);
      } else {
        markerRef.current = L.marker([lat, lng]).addTo(mapRef.current);
      }

      // Reverse geocoding (optional)
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
        );
        const data = await res.json();
        const city = data.address.city || "Unknown location";
        setLocationText(`📍 ${city}`);
      } catch (error) {
        console.error("Geocoding failed:", error);
      }
    },
    (error) => {
      alert(`Location access denied: ${error.message}`);
    }
  );
};

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", form);
    alert(`Crew "${form.crewName}" created successfully!`);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Host a Meal Crew</h2>

      {/* Location Sync Bar */}
      <div className="flex items-center gap-3 border rounded-full px-4 py-2 mb-6 bg-gray-50">
        <span>📍</span>
        <span className="flex-1 truncate">{locationText}</span>
        <span className="text-gray-500 text-sm">{locationTime}</span>
        <button 
          onClick={handleSyncLocation}
          className="text-blue-600 font-medium hover:text-blue-800"
        >
          Sync
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Crew Name */}
        <div className="space-y-1">
          <label className="block font-medium text-gray-700">Crew Name *</label>
          <input
            type="text"
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g., Jollof Fridays"
            value={form.crewName}
            onChange={(e) => setForm({...form, crewName: e.target.value})}
          />
        </div>

        {/* Meal Type & Description */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-1">
            <label className="block font-medium text-gray-700">Meal Type *</label>
            <select
              required
              className="w-full px-4 py-2 border rounded-lg"
              value={form.mealType}
              onChange={(e) => setForm({...form, mealType: e.target.value})}
            >
              <option value="">Select meal type</option>
              <option>Breakfast</option>
              <option>Lunch</option>
              <option>Dinner</option>
              <option>Snacks</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="block font-medium text-gray-700">Max Crew Size *</label>
            <input
              type="number"
              min="1"
              required
              className="w-full px-4 py-2 border rounded-lg"
              value={form.crewSize}
              onChange={(e) => setForm({...form, crewSize: e.target.value})}
            />
          </div>
        </div>

        {/* Meal Description */}
        <div className="space-y-1">
          <label className="block font-medium text-gray-700">Meal Description *</label>
          <textarea
            required
            rows={3}
            className="w-full px-4 py-2 border rounded-lg"
            placeholder="Describe the meal, cuisine, dietary info..."
            value={form.mealDesc}
            onChange={(e) => setForm({...form, mealDesc: e.target.value})}
          />
        </div>

        {/* Date & Time */}
        <div className="space-y-1">
          <label className="block font-medium text-gray-700">Date & Time *</label>
          <input
            type="datetime-local"
            required
            className="w-full px-4 py-2 border rounded-lg"
            value={form.datetime}
            onChange={(e) => setForm({...form, datetime: e.target.value})}
          />
        </div>

        {/* Location Map */}
        <div className="space-y-1">
          <label className="block font-medium text-gray-700">Location *</label>
          <input
            type="text"
            required
            className="w-full px-4 py-2 border rounded-lg mb-2"
            value={form.location}
            onChange={(e) => setForm({...form, location: e.target.value})}
          />
          <div id="map" className="w-full h-64 rounded-lg border-2 border-gray-200"></div>
        </div>

        {/* Meal Source */}
        <div className="space-y-1">
          <label className="block font-medium text-gray-700">Meal Source *</label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="mealSource"
                checked={form.mealSource === "home"}
                onChange={() => setForm({...form, mealSource: "home"})}
              />
              Home Cooked
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="mealSource"
                checked={form.mealSource === "restaurant"}
                onChange={() => setForm({...form, mealSource: "restaurant"})}
              />
              Restaurant
            </label>
          </div>
        </div>

        {/* Conditional Fields */}
        {form.mealSource === "restaurant" && (
          <div className="space-y-1">
            <label className="block font-medium text-gray-700">Restaurant</label>
            <input
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="Search restaurants..."
              value={form.restaurant}
              onChange={(e) => setForm({...form, restaurant: e.target.value})}
            />
          </div>
        )}

        {form.mealSource === "home" && (
          <div className="space-y-1">
            <label className="block font-medium text-gray-700">Price Per Person (₦)</label>
            <input
              type="number"
              min="0"
              className="w-full px-4 py-2 border rounded-lg"
              value={form.price}
              onChange={(e) => setForm({...form, price: e.target.value})}
            />
          </div>
        )}

        {/* Delivery Method */}
        <div className="space-y-1">
          <label className="block font-medium text-gray-700">Delivery Method *</label>
          <select
            required
            className="w-full px-4 py-2 border rounded-lg"
            value={form.deliveryOption}
            onChange={(e) => setForm({...form, deliveryOption: e.target.value})}
          >
            <option value="home">Deliver to Host</option>
            <option value="pickup">Pickup at Restaurant</option>
            <option value="dinein">Dine-in at Restaurant</option>
          </select>
        </div>

        {/* Toggles */}
        <div className="flex flex-wrap gap-4 pt-2">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={form.isPrivate}
              onChange={(e) => setForm({...form, isPrivate: e.target.checked})}
            />
            Private Crew (Invite Only)
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={form.allowChat}
              onChange={(e) => setForm({...form, allowChat: e.target.checked})}
            />
            Allow Chat Before Full
          </label>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition"
          >
            Create Crew
          </button>
        </div>
      </form>
    </div>
  );
}
