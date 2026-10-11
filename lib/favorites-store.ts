"use client";

import type { PexelsPhoto, PexelsVideo } from "@/types/pexels";

export type FavoriteType = "photos" | "videos";

export interface FavoritesStore {
  photos: Record<number, PexelsPhoto>;
  videos: Record<number, PexelsVideo>;
}

const STORAGE_KEY = "favorites";

const EMPTY_STORE: FavoritesStore = { photos: {}, videos: {} };

let snapshot: FavoritesStore | null = null;
const listeners = new Set<() => void>();

function readStorage(): FavoritesStore {
  if (typeof window === "undefined") return EMPTY_STORE;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY_STORE;
    const parsed = JSON.parse(raw) as Partial<FavoritesStore>;
    return {
      photos: parsed.photos ?? {},
      videos: parsed.videos ?? {},
    };
  } catch {
    return EMPTY_STORE;
  }
}

function writeStorage(store: FavoritesStore) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  } catch {
    // Ignore quota / privacy-mode failures.
  }
}

function emit() {
  for (const listener of listeners) listener();
}

function replaceSnapshot(next: FavoritesStore) {
  snapshot = next;
  emit();
}

function handleStorage(event: StorageEvent) {
  if (event.key !== null && event.key !== STORAGE_KEY) return;
  snapshot = readStorage();
  emit();
}

export function getSnapshot(): FavoritesStore {
  if (snapshot === null) snapshot = readStorage();
  return snapshot;
}

export function getServerSnapshot(): FavoritesStore {
  return EMPTY_STORE;
}

export function subscribe(listener: () => void): () => void {
  listeners.add(listener);

  if (typeof window !== "undefined" && listeners.size === 1) {
    window.addEventListener("storage", handleStorage);
  }

  return () => {
    listeners.delete(listener);
    if (typeof window !== "undefined" && listeners.size === 0) {
      window.removeEventListener("storage", handleStorage);
    }
  };
}

export function isFavorite(type: FavoriteType, id: number): boolean {
  return Boolean(getSnapshot()[type][id]);
}

export function toggle(
  type: FavoriteType,
  id: number,
  data?: PexelsPhoto | PexelsVideo,
) {
  const current = getSnapshot();
  const next: FavoritesStore = {
    photos: { ...current.photos },
    videos: { ...current.videos },
  };

  if (next[type][id]) {
    delete next[type][id];
  } else if (data) {
    (next[type] as Record<number, PexelsPhoto | PexelsVideo>)[id] = data;
  }

  writeStorage(next);
  replaceSnapshot(next);
}
