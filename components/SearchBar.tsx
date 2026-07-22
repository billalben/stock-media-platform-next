"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Search,
  X,
  ArrowLeft,
  Image,
  Video,
  History,
} from "lucide-react";
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
      if (desktopRef.current && !desktopRef.current.contains(e.target as Node)) {
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
      <div ref={desktopRef} className="hidden md:block relative w-full max-w-[560px] xl:max-w-[720px]">
        <div className="bg-surface-container-high rounded-3xl overflow-hidden focus-within:shadow-md">
          <div className="flex items-center h-12 px-4 gap-4">
            <Search size={32} className="text-on-surface-variant shrink-0" />
            <input
              type="search"
              placeholder="Search..."
              className="flex-1 h-full bg-transparent text-on-surface text-body-large outline-none placeholder:text-on-surface-variant"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => setFocused(true)}
            />
            {query && (
              <button
                className="icon-btn !w-8 !h-8 !min-w-8"
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
          <div className="absolute left-0 right-0 top-full mt-1 rounded-2xl bg-surface-container-high shadow-[0_1px_2px_rgba(0,0,0,0.3),0_2px_6px_2px_rgba(0,0,0,0.15)] z-50 animate-[menu-in_200ms_ease_forwards]">
            {/* Segment toggle */}
            <div className="flex m-4 border border-outline rounded-full overflow-hidden">
              <button
                onClick={() => setType("photos")}
                className={`flex-1 flex justify-center items-center gap-2 h-10 px-3 text-label-large
                  ${type === "photos" ? "bg-secondary-container text-on-secondary-container" : "text-on-surface"}`}
              >
                {/* eslint-disable-next-line jsx-a11y/alt-text */}
                <Image size={28} aria-hidden="true" />
                Photos
              </button>
              <button
                onClick={() => setType("videos")}
                className={`flex-1 flex justify-center items-center gap-2 h-10 px-3 text-label-large border-l border-outline
                  ${type === "videos" ? "bg-secondary-container text-on-secondary-container" : "text-on-surface"}`}
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
                    className="flex items-center gap-4 w-full h-12 px-4 text-on-surface text-body-large hover:bg-on-surface/[0.08]"
                    onClick={() => handleHistoryClick(item)}
                  >
                    <History size={28} className="text-on-surface-variant shrink-0" />
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
        <div className="md:hidden fixed inset-0 z-50 bg-surface-container-high">
          <div className="flex items-center gap-2 h-[72px] px-1 border-b border-outline">
            <button
              className="icon-btn"
              onClick={() => setOpen(false)}
              aria-label="Close search"
            >
              <ArrowLeft size={24} />
            </button>
            <div className="flex-1 h-full flex items-center">
              <input
                ref={inputRef}
                type="search"
                placeholder="Search..."
                className="w-full h-full bg-transparent text-on-surface text-body-large outline-none placeholder:text-on-surface-variant"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                autoComplete="off"
              />
            </div>
            {query && (
              <button
                className="icon-btn"
                onClick={() => { setQuery(""); inputRef.current?.focus(); }}
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
          <div className="flex m-4 border border-outline rounded-full overflow-hidden">
            <button
              onClick={() => setType("photos")}
              className={`flex-1 flex justify-center items-center gap-2 h-10 px-3 text-label-large
                ${type === "photos" ? "bg-secondary-container text-on-secondary-container" : "text-on-surface"}`}
            >
              {/* eslint-disable-next-line jsx-a11y/alt-text */}
              <Image size={28} aria-hidden="true" />
              Photos
            </button>
            <button
              onClick={() => setType("videos")}
              className={`flex-1 flex justify-center items-center gap-2 h-10 px-3 text-label-large border-l border-outline
                ${type === "videos" ? "bg-secondary-container text-on-secondary-container" : "text-on-surface"}`}
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
                  className="flex items-center gap-4 w-full h-12 px-4 text-on-surface text-body-large"
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
