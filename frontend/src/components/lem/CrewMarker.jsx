import { Marker } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const createCrewIcon = (avatarUrl) =>
  L.icon({
    iconUrl: avatarUrl || "/default-avatar.png",
    iconSize: [40, 40],
    className: "rounded-full shadow-lg",
    iconAnchor: [20, 40],
  });

export default function CrewMarker({ crew, onSelect }) {
  return (
    <Marker
      position={[crew.location.lat, crew.location.lng]}
      icon={createCrewIcon(crew.avatar)}
      eventHandlers={{
        click: () => onSelect(crew),
      }}
    />
  );
}
