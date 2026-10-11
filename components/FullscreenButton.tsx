"use client";

import { useCallback, useEffect, useState } from "react";
import { Maximize, Minimize } from "lucide-react";

interface FullscreenButtonProps {
  targetId: string;
  className?: string;
}

export default function FullscreenButton({
  targetId,
  className,
}: FullscreenButtonProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const onChange = () => setIsFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  const toggleFullscreen = useCallback(() => {
    const el = document.getElementById(targetId);
    if (!el) return;
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    } else {
      const result = el.requestFullscreen?.();
      result?.catch(() => {});
    }
  }, [targetId]);

  return (
    <button
      type="button"
      onClick={toggleFullscreen}
      className={className ?? "icon-btn"}
      aria-label={isFullscreen ? "Exit fullscreen" : "View fullscreen"}
    >
      {isFullscreen ? <Minimize size={22} /> : <Maximize size={22} />}
    </button>
  );
}
