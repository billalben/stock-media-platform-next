"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSearchHistory } from "@/hooks/useSearchHistory";

type SearchType = "photos" | "videos";

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { history, addToHistory } = useSearchHistory();

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [type, setType] = useState<SearchType>("photos");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

   
  useEffect(() => {
    setQuery(searchParams.get("query") || "");
  }, [searchParams]);

  const handleSubmit = () => {
    const trimmed = query.trim();
    if (!trimmed) return;
    addToHistory(trimmed);
    setOpen(false);
    router.push(`/${type}?query=${encodeURIComponent(trimmed)}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSubmit();
  };

  const handleHistoryClick = (item: string) => {
    setQuery(item);
    addToHistory(item);
    setOpen(false);
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
        <span className="material-symbols-outlined">search</span>
      </button>

      {/* Desktop: inline search */}
      <div className="hidden md:block w-full max-w-[560px] xl:max-w-[720px] bg-surface-container-high rounded-3xl overflow-hidden focus-within:shadow-md">
        <div className="flex items-center h-12 px-4 gap-4">
          <span className="material-symbols-outlined text-on-surface-variant text-[2rem]">
            search
          </span>
          <input
            type="search"
            placeholder="Search..."
            className="flex-1 h-full bg-transparent text-on-surface text-body-large outline-none placeholder:text-on-surface-variant"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          {query && (
            <button
              className="icon-btn !w-8 !h-8 !min-w-8"
              onClick={() => setQuery("")}
              aria-label="Clear"
            >
              <span className="material-symbols-outlined text-[1.8rem]">close</span>
            </button>
          )}
          <button
            className="icon-btn text-primary"
            onClick={handleSubmit}
            aria-label="Search"
          >
            <span className="material-symbols-outlined">search</span>
          </button>
        </div>
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
              <span className="material-symbols-outlined">arrow_back</span>
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
                <span className="material-symbols-outlined">close</span>
              </button>
            )}
            <button
              className="icon-btn text-primary"
              onClick={handleSubmit}
              aria-label="Search"
            >
              <span className="material-symbols-outlined">search</span>
            </button>
          </div>

          {/* Segment toggle */}
          <div className="flex m-4 border border-outline rounded-full overflow-hidden">
            <button
              onClick={() => setType("photos")}
              className={`flex-1 flex justify-center items-center gap-2 h-10 px-3 text-label-large
                ${type === "photos" ? "bg-secondary-container text-on-secondary-container" : "text-on-surface"}`}
            >
              <span className="material-symbols-outlined text-[1.8rem]">image</span>
              Photos
            </button>
            <button
              onClick={() => setType("videos")}
              className={`flex-1 flex justify-center items-center gap-2 h-10 px-3 text-label-large border-l border-outline
                ${type === "videos" ? "bg-secondary-container text-on-secondary-container" : "text-on-surface"}`}
            >
              <span className="material-symbols-outlined text-[1.8rem]">videocam</span>
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
                  <span className="material-symbols-outlined text-on-surface-variant text-[1.8rem]">
                    history
                  </span>
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
