"use client";

import { useRef, useCallback } from "react";
import { useFavorites } from "@/hooks/useFavorites";
import type { PexelsPhoto, PexelsVideo } from "@/types/pexels";

interface FavoriteButtonProps {
  type: "photos" | "videos";
  id: number;
  data?: PexelsPhoto | PexelsVideo;
  small?: boolean;
}

export default function FavoriteButton({ type, id, data, small }: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const btnRef = useRef<HTMLButtonElement>(null);
  const active = isFavorite(type, id);

  const handleClick = useCallback(() => {
    const btn = btnRef.current;
    if (btn) btn.disabled = true;
    toggleFavorite(type, id, active ? undefined : data);
    if (btn) btn.disabled = false;
  }, [type, id, active, data, toggleFavorite]);

  return (
    <button
      ref={btnRef}
      className={`icon-btn ${small ? "!w-10 !h-10 !min-w-10" : ""} ${active ? "active" : ""}`}
      onClick={handleClick}
      aria-label={active ? "Remove from favorites" : "Add to favorites"}
    >
      <span className={`material-symbols-outlined ${small ? "text-[1.8rem]" : ""}`}>
        favorite
      </span>
    </button>
  );
}
