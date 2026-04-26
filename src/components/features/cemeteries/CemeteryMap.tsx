'use client';

import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Cemetery } from '@/lib/dummy-data';
import { renderToStaticMarkup } from 'react-dom/server';
import { MapPin } from 'lucide-react';

// Fix for default marker icons in Leaflet + Next.js
const customIcon = L.divIcon({
  html: renderToStaticMarkup(
    <div className="p-1.5 bg-brand-primary text-white rounded-full shadow-lg border-2 border-white ring-2 ring-brand-primary/20">
      <MapPin className="w-5 h-5" />
    </div>
  ),
  className: 'custom-leaflet-icon',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

interface CemeteryMapProps {
  items: Cemetery[];
}

export default function CemeteryMap({ items }: CemeteryMapProps) {
  // Default center: Jakarta
  const center: [number, number] = [-6.2088, 106.8456];

  return (
    <div className="w-full h-full relative z-0">
      <MapContainer center={center} zoom={11} scrollWheelZoom={false} className="w-full h-full">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {items.map(
          (item) =>
            item.lat &&
            item.lng && (
              <Marker key={item.id} position={[item.lat, item.lng]} icon={customIcon}>
                <Popup>
                  <div className="p-1">
                    <h3 className="font-bold text-brand-text text-sm mb-1">{item.name}</h3>
                    <p className="text-xs text-brand-muted">{item.location}</p>
                    <p className="text-[10px] font-bold text-brand-primary mt-1">
                      {item.distance ?? '0 Km'}
                    </p>
                  </div>
                </Popup>
              </Marker>
            )
        )}
        <MapBounds items={items} />
      </MapContainer>

      {/* Map Overlay for Dark Mode styling (optional) */}
      <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-brand-border rounded-3xl" />
    </div>
  );
}

// Helper to auto-adjust map bounds based on markers
function MapBounds({ items }: { items: Cemetery[] }) {
  const map = useMap();

  if (items.length === 0) return null;

  const bounds = L.latLngBounds(items.filter((i) => i.lat && i.lng).map((i) => [i.lat!, i.lng!]));
  if (bounds.isValid()) {
    map.fitBounds(bounds, { padding: [50, 50] });
  }

  return null;
}
