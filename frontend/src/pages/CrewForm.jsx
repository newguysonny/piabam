import React, { useState, useEffect, useRef } from "react"; import L from "leaflet"; import "leaflet/dist/leaflet.css";

export default function CrewForm() { const [form, setForm] = useState({ crewName: "", mealType: "", mealDesc: "", location: "", datetime: "", crewSize: "", mealSource: "home", restaurant: "", price: "", deliveryOption: "home", isPrivate: false, allowChat: false, }); const [locationText, setLocationText] = useState("Unknown location"); const [locationTime, setLocationTime] = useState(""); const mapRef = useRef(null); const markerRef = useRef(null);

useEffect(() => { mapRef.current = L.map("map").setView([6.5244, 3.3792], 13); L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { attribution: "© OpenStreetMap contributors" }).addTo(mapRef.current);

mapRef.current.on("click", function (e) {
  const lat = e.latlng.lat.toFixed(6);
  const lng = e.latlng.lng.toFixed(6);
  setForm((prev) => ({ ...prev, location: `${lat}, ${lng}` }));
  if (markerRef.current) {
    markerRef.current.setLatLng(e.latlng);
  } else {
    markerRef.current = L.marker(e.latlng).addTo(mapRef.current);
  }
});

}, []);

const handleSyncLocation = async () => { if (navigator.geolocation) { navigator.geolocation.getCurrentPosition(async function (position) { const lat = position.coords.latitude; const lng = position.coords.longitude;

const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
    );
    const data = await res.json();
    const city = data.address.city || data.address.town || data.address.village || "Unknown city";
    const country = data.address.country || "Unknown country";
    const flag = country === "China" ? "🇨🇳" : "🌍";

    setLocationText(`${flag} ${country}, ${city}`);
    setLocationTime(new Date().toLocaleString());
    setForm((prev) => ({ ...prev, location: `${lat.toFixed(6)}, ${lng.toFixed(6)}` }));

    mapRef.current.setView([lat, lng], 15);
    if (markerRef.current) {
      markerRef.current.setLatLng([lat, lng]);
    } else {
      markerRef.current = L.marker([lat, lng]).addTo(mapRef.current);
    }
  });
} else {
  alert("Geolocation not supported.");
}

};

const handleSubmit = (e) => { e.preventDefault(); alert("Crew created successfully!\n\n" + JSON.stringify(form, null, 2)); };

return ( <div className="max-w-2xl mx-auto p-4 bg-white rounded-xl shadow"> <h2 className="text-xl font-semibold text-center mb-4">Host a Meal Crew</h2>

<div className="flex items-center justify-between gap-2 border rounded-full px-4 py-2 text-sm mb-4">
    <span>📍</span>
    <span>{locationText}</span>
    <span className="text-gray-500 text-xs ml-auto">{locationTime}</span>
    <button onClick={handleSyncLocation} className="text-blue-600 font-semibold ml-2">Sync</button>
  </div>

  <form onSubmit={handleSubmit} className="space-y-4">
    <div>
      <label className="font-semibold">Crew Name</label>
      <input type="text" required className="input" value={form.crewName} onChange={(e) => setForm({ ...form, crewName: e.target.value })} />
    </div>

    <div>
      <label className="font-semibold">Meal Type</label>
      <select required className="input" value={form.mealType} onChange={(e) => setForm({ ...form, mealType: e.target.value })}>
        <option value="">Select</option>
        <option>Breakfast</option>
        <option>Lunch</option>
        <option>Dinner</option>
        <option>Snacks</option>
      </select>
    </div>

    <div>
      <label className="font-semibold">Meal Description</label>
      <textarea required className="input" value={form.mealDesc} onChange={(e) => setForm({ ...form, mealDesc: e.target.value })} />
    </div>

    <div>
      <label className="font-semibold">Location</label>
      <input type="text" required className="input mb-2" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
      <div id="map" className="w-full h-64 rounded border"></div>
    </div>

    <div>
      <label className="font-semibold">Date & Time</label>
      <input type="datetime-local" required className="input" value={form.datetime} onChange={(e) => setForm({ ...form, datetime: e.target.value })} />
    </div>

    <div>
      <label className="font-semibold">Max Crew Size</label>
      <input type="number" required min="1" className="input" value={form.crewSize} onChange={(e) => setForm({ ...form, crewSize: e.target.value })} />
    </div>

    <div>
      <label className="font-semibold">Meal Source</label>
      <select required className="input" value={form.mealSource} onChange={(e) => setForm({ ...form, mealSource: e.target.value })}>
        <option value="home">Home Cooked</option>
        <option value="restaurant">Restaurant</option>
      </select>
    </div>

    {form.mealSource === "restaurant" && (
      <div>
        <label className="font-semibold">Restaurant</label>
        <input className="input" value={form.restaurant} onChange={(e) => setForm({ ...form, restaurant: e.target.value })} />
      </div>
    )}

    {form.mealSource === "home" && (
      <div>
        <label className="font-semibold">Price Per Person (₦)</label>
        <input type="number" min="0" className="input" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
      </div>
    )}

    <div>
      <label className="font-semibold">Delivery Method</label>
      <select required className="input" value={form.deliveryOption} onChange={(e) => setForm({ ...form, deliveryOption: e.target.value })}>
        <option value="home">Deliver to Host</option>
        <option value="pickup">Pickup at Restaurant</option>
        <option value="dinein">Dine-in at Restaurant</option>
      </select>
    </div>

    <div className="flex gap-4">
      <label><input type="checkbox" checked={form.isPrivate} onChange={(e) => setForm({ ...form, isPrivate: e.target.checked })} /> Private</label>
      <label><input type="checkbox" checked={form.allowChat} onChange={(e) => setForm({ ...form, allowChat: e.target.checked })} /> Allow Chat</label>
    </div>

    <div className="text-center">
      <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded">Create Crew</button>
    </div>
  </form>
</div>

); }

// Tailwind utility: input style const inputClass = "w-full border rounded px-3 py-2 mt-1"; const input = document.createElement('style'); input.innerHTML = .input { ${inputClass} }; document.head.appendChild(input);

