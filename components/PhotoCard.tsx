"use client";

import { useCallback } from "react";
import type { PexelsPhoto } from "@/types/pexels";
import FavoriteButton from "./FavoriteButton";
import { openLightbox, type LightboxItem } from "@/lib/lightbox-store";

interface PhotoCardProps {
  photo: PexelsPhoto;
  lightboxItems?: PexelsPhoto[];
}

export default function PhotoCard({ photo, lightboxItems }: PhotoCardProps) {
  const { id, width, height, src, alt, avg_color } = photo;

  const handleOpen = useCallback(() => {
    const list =
      lightboxItems && lightboxItems.length > 0 ? lightboxItems : [photo];
    const items: LightboxItem[] = list.map((p) => ({ type: "photo", data: p }));
    const index = Math.max(
      0,
      list.findIndex((p) => p.id === photo.id),
    );
    openLightbox(items, index);
  }, [lightboxItems, photo]);

  return (
    <div
      className="card mb-2 break-inside-avoid md:mb-3"
      style={{ backgroundColor: avg_color }}
    >
      <figure
        className="relative w-full"
        style={{ aspectRatio: `${width} / ${height}` }}
      >
        <img
          src={src.large}
          alt={alt}
          width={width}
          height={height}
          className="h-full w-full object-cover"
          loading="lazy"
        />

        <button
          type="button"
          onClick={handleOpen}
          className="absolute inset-0 z-1 cursor-zoom-in"
          aria-label={`View ${alt || "photo"}`}
        />
      </figure>

      <div className="card-favorite-bar absolute right-0 bottom-0 left-0 z-2 flex justify-end bg-linear-to-t from-black/75 to-transparent p-1.25">
        <FavoriteButton type="photos" id={id} data={photo} small />
      </div>
    </div>
  );
}
