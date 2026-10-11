"use client";

import type { PexelsPhoto, PexelsVideo } from "@/types/pexels";

export type LightboxItem =
  | { type: "photo"; data: PexelsPhoto }
  | { type: "video"; data: PexelsVideo };

export interface LightboxState {
  items: LightboxItem[];
  index: number;
}

let snapshot: LightboxState | null = null;
const listeners = new Set<() => void>();

function emit() {
  for (const listener of listeners) listener();
}

export function getSnapshot(): LightboxState | null {
  return snapshot;
}

export function getServerSnapshot(): LightboxState | null {
  return null;
}

export function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function openLightbox(items: LightboxItem[], index: number) {
  if (items.length === 0) return;
  snapshot = {
    items,
    index: Math.min(Math.max(index, 0), items.length - 1),
  };
  emit();
}

export function closeLightbox() {
  snapshot = null;
  emit();
}

export function navigateLightbox(index: number) {
  if (!snapshot) return;
  snapshot = { ...snapshot, index };
  emit();
}
