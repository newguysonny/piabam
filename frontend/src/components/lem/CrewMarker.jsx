// components/map/CrewMarker.jsx
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Custom icon maker using crew avatar or fallback
const createCrewIcon = (avatarUrl) =>
  L.icon({
    iconUrl: avatarUrl || "/default-avatar.png",
    iconSize: [40, 40],
    className: "rounded-full shadow-lg",
    iconAnchor: [20, 40], // anchor point at bottom center
    popupAnchor: [0, -40]
  });

// CrewMarker Component
export default function CrewMarker({ crew }) {
  const { name, location, joined, capacity, avatar } = crew;

  return (
    <Marker
      position={[location.lat, location.lng]}
      icon={createCrewIcon(avatar)}
    >
      <Popup className="text-sm">
        <div className="font-semibold text-gray-800">{name}</div>
        <div className="text-gray-600">{joined}/{capacity} joined</div>
      </Popup>
    </Marker>
  );
}
