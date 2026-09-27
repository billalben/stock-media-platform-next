"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { ChevronDown } from "lucide-react";

interface DownloadMenuProps {
  downloads: { label: string; url: string }[];
}

export default function DownloadMenu({ downloads }: DownloadMenuProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const toggle = useCallback(() => setOpen((p) => !p), []);

  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [open]);

  return (
    <div ref={ref} className="relative max-w-max">
      <div className="split-btn inline-flex h-10 items-center overflow-hidden rounded-full bg-primary text-on-primary">
        <a
          href={downloads[0]?.url || "#"}
          target="_blank"
          rel="noopener"
          download
          className="grid h-full place-items-center border-r border-outline-variant px-4"
        >
          <span className="text-label-large">Download</span>
        </a>
        <button
          onClick={toggle}
          className="grid h-full w-10 place-items-center"
          aria-label="Select download quality"
        >
          <ChevronDown size={20} />
        </button>
      </div>

      {open && (
        <div className="absolute top-full right-0 z-50 mt-2 w-max min-w-30 origin-top-right scale-95 animate-[menu-in_200ms_ease_forwards] rounded-lg bg-surface-container py-2 opacity-0 shadow-[0_1px_2px_rgba(0,0,0,0.3),0_2px_6px_2px_rgba(0,0,0,0.15)]">
          {downloads.map((d) => (
            <a
              key={d.url}
              href={d.url}
              target="_blank"
              rel="noopener"
              download
              className="flex h-12 items-center px-3 text-label-large text-on-surface hover:bg-on-surface/8"
              onClick={() => setOpen(false)}
            >
              {d.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
