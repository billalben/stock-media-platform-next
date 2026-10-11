"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useSyncExternalStore,
  type KeyboardEvent,
} from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ExternalLink, X } from "lucide-react";
import FullscreenButton from "./FullscreenButton";
import {
  closeLightbox,
  getServerSnapshot,
  getSnapshot,
  navigateLightbox,
  subscribe,
  type LightboxItem,
} from "@/lib/lightbox-store";

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), video, [tabindex]:not([tabindex="-1"])';

function trapFocus(event: KeyboardEvent<HTMLElement>, container: HTMLElement) {
  const focusable = Array.from(
    container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
  );
  if (focusable.length === 0) return;

  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}

export default function MediaLightbox() {
  const state = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  if (!state) return null;

  return (
    <LightboxOverlay
      items={state.items}
      index={state.index}
      onClose={closeLightbox}
      onNavigate={navigateLightbox}
    />
  );
}

function LightboxOverlay({
  items,
  index,
  onClose,
  onNavigate,
}: {
  items: LightboxItem[];
  index: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const item = items[index];
  const hasPrev = index > 0;
  const hasNext = index < items.length - 1;

  const detailsHref =
    item.type === "photo" ? `/photos/${item.data.id}` : `/videos/${item.data.id}`;

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    dialogRef.current?.focus();
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
      previouslyFocused?.focus?.();
    };
  }, []);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      } else if (event.key === "ArrowLeft" && hasPrev) {
        event.preventDefault();
        onNavigate(index - 1);
      } else if (event.key === "ArrowRight" && hasNext) {
        event.preventDefault();
        onNavigate(index + 1);
      } else if (event.key === "Tab" && dialogRef.current) {
        trapFocus(event, dialogRef.current);
      }
    },
    [onClose, onNavigate, index, hasPrev, hasNext],
  );

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label="Media viewer"
      tabIndex={-1}
      onKeyDown={handleKeyDown}
      className="fixed inset-0 z-50 outline-none"
    >
      <div
        className="absolute inset-0 bg-scrim/90"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="pointer-events-none relative flex h-full flex-col">
        <header className="pointer-events-auto flex items-center justify-between gap-2 p-2 text-white">
          <span className="pl-2 text-label-large">
            {index + 1} / {items.length}
          </span>

          <div className="flex items-center gap-1">
            <Link
              href={detailsHref}
              className="flex h-11 items-center gap-2 rounded-full bg-white/10 px-4 text-label-large text-white transition-colors hover:bg-white/20"
            >
              <span>Open details</span>
              <ExternalLink size={18} />
            </Link>
            <FullscreenButton
              targetId="lightbox-media"
              className="icon-btn text-white"
            />
            <button
              type="button"
              onClick={onClose}
              className="icon-btn text-white"
              aria-label="Close viewer"
            >
              <X size={24} />
            </button>
          </div>
        </header>

        <div className="relative flex flex-1 items-center justify-center overflow-hidden p-2 pb-6">
          {hasPrev && (
            <button
              type="button"
              onClick={() => onNavigate(index - 1)}
              className="pointer-events-auto absolute left-2 z-10 grid h-12 w-12 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
              aria-label="Previous"
            >
              <ChevronLeft size={28} />
            </button>
          )}

          <div
            id="lightbox-media"
            key={index}
            className="pointer-events-none flex h-full w-full items-center justify-center"
          >
            {item.type === "photo" ? (
              <img
                src={item.data.src.large2x}
                alt={item.data.alt}
                width={item.data.width}
                height={item.data.height}
                className="pointer-events-auto max-h-full max-w-full object-contain"
              />
            ) : (
              <video
                src={
                  (item.data.video_files.find((f) => f.quality === "hd") ||
                    item.data.video_files[0])?.link
                }
                poster={item.data.image}
                controls
                autoPlay
                muted
                playsInline
                className="pointer-events-auto max-h-full max-w-full object-contain"
                style={{ aspectRatio: `${item.data.width} / ${item.data.height}` }}
              />
            )}
          </div>

          {hasNext && (
            <button
              type="button"
              onClick={() => onNavigate(index + 1)}
              className="pointer-events-auto absolute right-2 z-10 grid h-12 w-12 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
              aria-label="Next"
            >
              <ChevronRight size={28} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
