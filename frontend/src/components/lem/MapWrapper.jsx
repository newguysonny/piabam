
/*
// src/components/lem/MapWrapper.jsx
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function MapWrapper({ children }) {
  const defaultPosition = [6.5244, 3.3792]; // Lagos

  return (
    <div className="w-full h-screen">
      <MapContainer
        center={defaultPosition}
        zoom={13}
        scrollWheelZoom={true}
        className="w-full h-full z-0"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {children}
      </MapContainer>
    </div>
  );
}
*/

import { MapContainer, TileLayer } from "react-leaflet";
import { useRef, useEffect } from "react";

export default function MapWrapper() {
  const mapRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      mapRef.current?.invalidateSize();
    }, 100);
  }, []);

  return (
    <MapContainer
      center={[6.5244, 3.3792]}
      zoom={13}
      whenCreated={(mapInstance) => (mapRef.current = mapInstance)}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
    </MapContainer>
  );
}
