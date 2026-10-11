"use client";

import { useCallback, useSyncExternalStore } from "react";
import type { PexelsPhoto, PexelsVideo } from "@/types/pexels";
import {
  getServerSnapshot,
  getSnapshot,
  subscribe,
  toggle,
  type FavoriteType,
} from "@/lib/favorites-store";

export function useFavorites() {
  const favorites = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  const isFavorite = useCallback(
    (type: FavoriteType, id: number) => Boolean(favorites[type][id]),
    [favorites],
  );

  const toggleFavorite = useCallback(
    (
      type: FavoriteType,
      id: number,
      data?: PexelsPhoto | PexelsVideo,
    ) => {
      toggle(type, id, data);
    },
    [],
  );

  const getFavoritesByType = useCallback(
    (type: FavoriteType) => Object.values(favorites[type]),
    [favorites],
  );

  return { favorites, isFavorite, toggleFavorite, getFavoritesByType };
}
