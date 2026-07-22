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
      <div className="split-btn inline-flex items-center h-10 bg-primary text-on-primary rounded-full overflow-hidden">
        <a
          href={downloads[0]?.url || "#"}
          target="_blank"
          rel="noopener"
          download
          className="px-4 h-full grid place-items-center border-r border-outline-variant"
        >
          <span className="text-label-large">Download</span>
        </a>
        <button
          onClick={toggle}
          className="w-10 h-full grid place-items-center"
          aria-label="Select download quality"
        >
          <ChevronDown size={20} />
        </button>
      </div>

      {open && (
        <div className="absolute top-full right-0 mt-2 py-2 min-w-30 w-max bg-surface-container rounded-lg shadow-[0_1px_2px_rgba(0,0,0,0.3),0_2px_6px_2px_rgba(0,0,0,0.15)] z-50 origin-top-right scale-95 opacity-0 animate-[menu-in_200ms_ease_forwards]">
          {downloads.map((d) => (
            <a
              key={d.url}
              href={d.url}
              target="_blank"
              rel="noopener"
              download
              className="flex items-center px-3 h-12 text-label-large text-on-surface hover:bg-on-surface/8"
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
