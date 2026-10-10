import Link from "next/link";
import type { PexelsPhoto } from "@/types/pexels";
import FavoriteButton from "./FavoriteButton";

interface PhotoCardProps {
  photo: PexelsPhoto;
}

export default function PhotoCard({ photo }: PhotoCardProps) {
  const { id, width, height, src, alt, avg_color } = photo;

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
      </figure>

      <div className="card-favorite-bar absolute right-0 bottom-0 left-0 z-2 flex justify-end bg-linear-to-t from-black/75 to-transparent p-1.25">
        <FavoriteButton type="photos" id={id} data={photo} small />
      </div>

      <Link
        href={`/photos/${id}`}
        className="absolute inset-0 z-1"
        aria-label={alt}
      />
    </div>
  );
}
