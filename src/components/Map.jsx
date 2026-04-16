"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Coordonatele clădirii principale a mănăstirii (lângă râul Târgușor / DC81)
const DEFAULT_LAT = 44.4712;
const DEFAULT_LNG = 28.4735;
const DEFAULT_ZOOM = 15;

const TILE_URL = "https://tile.openstreetmap.org/{z}/{x}/{y}.png";
const TILE_ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a>';

/**
 * Componenta hartă Leaflet — self-hosted, fără Google Maps.
 * Folosește tile server OpenStreetMap (gratuit, fără API key).
 */
export default function Map({
  lat = DEFAULT_LAT,
  lng = DEFAULT_LNG,
  zoom = DEFAULT_ZOOM,
  className = "",
}) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    if (mapInstanceRef.current) return; // deja inițializat

    // Fix Leaflet default marker icon (webpack issue)
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
      iconRetinaUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
      shadowUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    });

    const map = L.map(mapRef.current, {
      center: [lat, lng],
      zoom,
      scrollWheelZoom: false, // evită zoom accidental la scroll
    });

    L.tileLayer(TILE_URL, {
      attribution: TILE_ATTRIBUTION,
      maxZoom: 18,
    }).addTo(map);

    // Marker personalizat
    const marker = L.marker([lat, lng]).addTo(map);
    marker.bindPopup(
      `<div style="font-family: 'Inter', sans-serif; text-align: center; line-height: 1.4;">
        <strong style="font-size: 0.875rem; display: block; margin-bottom: 4px;">
          Mănăstirea Sf. Dionisie &amp; Sf. Efrem
        </strong>
        <span style="font-size: 0.75rem; color: #5C4A35;">
          Comuna Târgușor, jud. Constanța
        </span>
      </div>`,
      { maxWidth: 220 }
    );

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, [lat, lng, zoom]);

  return (
    <div
      ref={mapRef}
      className={`w-full rounded-[4px] border border-border ${className}`}
      style={{ minHeight: "350px" }}
    />
  );
}
