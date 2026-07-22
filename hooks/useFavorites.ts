"use client";

import { useState, useCallback, useEffect } from "react";
import type { PexelsPhoto, PexelsVideo } from "@/types/pexels";

interface FavoritesStore {
  photos: Record<number, PexelsPhoto>;
  videos: Record<number, PexelsVideo>;
}

const STORAGE_KEY = "favorites";
const DEFAULT_STORE: FavoritesStore = { photos: {}, videos: {} };

function loadFavorites(): FavoritesStore {
  if (typeof window === "undefined") return DEFAULT_STORE;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : DEFAULT_STORE;
  } catch {
    return DEFAULT_STORE;
  }
}

function saveFavorites(store: FavoritesStore) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<FavoritesStore>(DEFAULT_STORE);

   
  useEffect(() => {
    setFavorites(loadFavorites());
  }, []);

  const isFavorite = useCallback(
    (type: "photos" | "videos", id: number) => {
      return Boolean(favorites[type][id]);
    },
    [favorites]
  );

  const toggleFavorite = useCallback(
    (type: "photos" | "videos", id: number, data?: PexelsPhoto | PexelsVideo) => {
      setFavorites((prev) => {
        const next = {
          photos: { ...prev.photos },
          videos: { ...prev.videos },
        };

        if (next[type][id]) {
          delete next[type][id];
        } else if (data) {
          (next[type] as Record<number, typeof data>)[id] = data;
        }

        saveFavorites(next);
        return next;
      });
    },
    []
  );

  const getFavoritesByType = useCallback(
    (type: "photos" | "videos") => Object.values(favorites[type]),
    [favorites]
  );

  return { favorites, isFavorite, toggleFavorite, getFavoritesByType };
}
