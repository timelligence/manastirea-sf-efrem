"use client";

import { useState } from "react";
import Image from "next/image";

export default function LightboxGallery({ images }) {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-8">
        {images.map((src, idx) => (
          <div
            key={idx}
            className="relative aspect-[4/3] cursor-pointer overflow-hidden rounded-md group shadow-sm hover:shadow-md transition-shadow"
            onClick={() => setSelectedImage(src)}
          >
            <Image
              src={src}
              alt={`Galerie foto mănăstire ${idx + 1}`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        ))}
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 md:p-8 backdrop-blur-sm"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 md:top-6 md:right-6 text-white/70 hover:text-white z-50 p-2 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedImage(null);
            }}
            aria-label="Închide"
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
          
          <div className="relative w-full max-w-6xl aspect-[4/3] md:aspect-auto md:h-[90vh]">
            <Image
              src={selectedImage}
              alt="Imagine mărită mănăstire"
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
          </div>
        </div>
      )}
    </>
  );
}
