"use client";

import dynamic from "next/dynamic";

/**
 * Wrapper client pentru Leaflet — necesar deoarece Next.js 16
 * nu permite `ssr: false` în Server Components.
 */
const LeafletMap = dynamic(() => import("@/components/Map"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[350px] md:h-[500px] bg-secondary rounded-[4px] border border-border flex items-center justify-center">
      <p className="text-text-muted text-[0.8125rem] font-body">
        Se încarcă harta…
      </p>
    </div>
  ),
});

export default function MapWrapper({ lat, lng, zoom, className }) {
  return (
    <LeafletMap lat={lat} lng={lng} zoom={zoom} className={className} />
  );
}
