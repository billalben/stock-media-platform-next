import Link from "next/link";
import Image from "next/image";
import type { PexelsPhoto } from "@/types/pexels";
import FavoriteButton from "./FavoriteButton";

interface PhotoCardProps {
  photo: PexelsPhoto;
}

export default function PhotoCard({ photo }: PhotoCardProps) {
  const { id, width, height, src, alt, avg_color } = photo;

  return (
    <div
      className="card break-inside-avoid mb-2 md:mb-3"
      style={{ backgroundColor: avg_color }}
    >
      <figure
        className="relative w-full"
        style={{ aspectRatio: `${width} / ${height}` }}
      >
        <Image
          src={src.large}
          alt={alt}
          width={width}
          height={height}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </figure>

      <div className="card-favorite-bar absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/75 to-transparent p-1.25 flex justify-end z-2">
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
