"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, X, ArrowLeft, Image, Video, History } from "lucide-react";
import { useSearchHistory } from "@/hooks/useSearchHistory";

type SearchType = "photos" | "videos";

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { history, addToHistory } = useSearchHistory();

  const [open, setOpen] = useState(false);
  const [focused, setFocused] = useState(false);
  const [query, setQuery] = useState("");
  const [type, setType] = useState<SearchType>("photos");
  const inputRef = useRef<HTMLInputElement>(null);
  const desktopRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    setQuery(searchParams.get("query") || "");
  }, [searchParams]);

  useEffect(() => {
    if (!focused) return;
    const handleClick = (e: MouseEvent) => {
      if (
        desktopRef.current &&
        !desktopRef.current.contains(e.target as Node)
      ) {
        setFocused(false);
      }
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [focused]);

  const handleSubmit = () => {
    const trimmed = query.trim();
    if (!trimmed) return;
    addToHistory(trimmed);
    setOpen(false);
    setFocused(false);
    router.push(`/${type}?query=${encodeURIComponent(trimmed)}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSubmit();
  };

  const handleHistoryClick = (item: string) => {
    setQuery(item);
    addToHistory(item);
    setOpen(false);
    setFocused(false);
    router.push(`/${type}?query=${encodeURIComponent(item)}`);
  };

  return (
    <>
      {/* Mobile: search icon that opens overlay */}
      <button
        className="icon-btn md:hidden"
        onClick={() => setOpen(true)}
        aria-label="Open search"
      >
        <Search size={24} />
      </button>

      {/* Desktop: inline search with dropdown */}
      <div
        ref={desktopRef}
        className="relative hidden w-full max-w-140 md:block xl:max-w-180"
      >
        <div className="overflow-hidden rounded-3xl bg-surface-container-high focus-within:shadow-md">
          <div className="flex h-12 items-center gap-4 px-4">
            <Search size={32} className="shrink-0 text-on-surface-variant" />
            <input
              type="search"
              placeholder="Search..."
              className="h-full flex-1 bg-transparent text-body-large text-on-surface outline-none placeholder:text-on-surface-variant"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => setFocused(true)}
            />
            {query && (
              <button
                className="icon-btn h-8! w-8! min-w-8!"
                onClick={() => setQuery("")}
                aria-label="Clear"
              >
                <X size={28} />
              </button>
            )}
            <button
              className="icon-btn text-primary"
              onClick={handleSubmit}
              aria-label="Search"
            >
              <Search size={24} />
            </button>
          </div>
        </div>

        {/* Desktop dropdown */}
        {focused && (
          <div className="absolute top-full right-0 left-0 z-50 mt-1 animate-[menu-in_200ms_ease_forwards] rounded-2xl bg-surface-container-high shadow-[0_1px_2px_rgba(0,0,0,0.3),0_2px_6px_2px_rgba(0,0,0,0.15)]">
            {/* Segment toggle */}
            <div className="m-4 flex overflow-hidden rounded-full border border-outline">
              <button
                onClick={() => setType("photos")}
                className={`flex h-10 flex-1 items-center justify-center gap-2 px-3 text-label-large ${type === "photos" ? "bg-secondary-container text-on-secondary-container" : "text-on-surface"}`}
              >
                {/* eslint-disable-next-line jsx-a11y/alt-text */}
                <Image size={28} aria-hidden="true" />
                Photos
              </button>
              <button
                onClick={() => setType("videos")}
                className={`flex h-10 flex-1 items-center justify-center gap-2 border-l border-outline px-3 text-label-large ${type === "videos" ? "bg-secondary-container text-on-secondary-container" : "text-on-surface"}`}
              >
                <Video size={28} />
                Videos
              </button>
            </div>

            <div className="mx-4 h-px bg-outline-variant" />

            {/* Search history */}
            {history.length > 0 && (
              <div className="py-2">
                {history.slice(0, 5).map((item) => (
                  <button
                    key={item}
                    className="flex h-12 w-full items-center gap-4 px-4 text-body-large text-on-surface hover:bg-on-surface/8"
                    onClick={() => handleHistoryClick(item)}
                  >
                    <History
                      size={28}
                      className="shrink-0 text-on-surface-variant"
                    />
                    <span className="truncate">{item}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Mobile: fullscreen search overlay */}
      {open && (
        <div className="fixed inset-0 z-50 bg-surface-container-high md:hidden">
          <div className="flex h-18 items-center gap-2 border-b border-outline px-1">
            <button
              className="icon-btn"
              onClick={() => setOpen(false)}
              aria-label="Close search"
            >
              <ArrowLeft size={24} />
            </button>
            <div className="flex h-full flex-1 items-center">
              <input
                ref={inputRef}
                type="search"
                placeholder="Search..."
                className="h-full w-full bg-transparent text-body-large text-on-surface outline-none placeholder:text-on-surface-variant"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                autoComplete="off"
              />
            </div>
            {query && (
              <button
                className="icon-btn"
                onClick={() => {
                  setQuery("");
                  inputRef.current?.focus();
                }}
                aria-label="Clear"
              >
                <X size={24} />
              </button>
            )}
            <button
              className="icon-btn text-primary"
              onClick={handleSubmit}
              aria-label="Search"
            >
              <Search size={24} />
            </button>
          </div>

          {/* Segment toggle */}
          <div className="m-4 flex overflow-hidden rounded-full border border-outline">
            <button
              onClick={() => setType("photos")}
              className={`flex h-10 flex-1 items-center justify-center gap-2 px-3 text-label-large ${type === "photos" ? "bg-secondary-container text-on-secondary-container" : "text-on-surface"}`}
            >
              {/* eslint-disable-next-line jsx-a11y/alt-text */}
              <Image size={28} aria-hidden="true" />
              Photos
            </button>
            <button
              onClick={() => setType("videos")}
              className={`flex h-10 flex-1 items-center justify-center gap-2 border-l border-outline px-3 text-label-large ${type === "videos" ? "bg-secondary-container text-on-secondary-container" : "text-on-surface"}`}
            >
              <Video size={28} />
              Videos
            </button>
          </div>

          <div className="mx-4 h-px bg-outline-variant" />

          {/* Search history */}
          {history.length > 0 && (
            <div className="py-2">
              {history.map((item) => (
                <button
                  key={item}
                  className="flex h-12 w-full items-center gap-4 px-4 text-body-large text-on-surface"
                  onClick={() => handleHistoryClick(item)}
                >
                  <History size={28} className="text-on-surface-variant" />
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}
