"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { Play } from "lucide-react";
import type { PexelsVideo } from "@/types/pexels";
import FavoriteButton from "./FavoriteButton";
import { useMediaLightbox, type LightboxItem } from "./MediaLightbox";

interface VideoCardProps {
  video: PexelsVideo;
  lightboxItems?: PexelsVideo[];
}

export default function VideoCard({ video, lightboxItems }: VideoCardProps) {
  const { id, width, height, image, video_files } = video;
  const videoRef = useRef<HTMLVideoElement>(null);
  const [loaded, setLoaded] = useState(false);
  const badgeRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const { open } = useMediaLightbox();

  const sdVideo =
    video_files.find((f) => f.quality === "sd" && f.width < 1000) ||
    video_files[0];

  useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

  const handlePointerOver = useCallback(() => {
    timerRef.current = setTimeout(() => {
      const badge = badgeRef.current;
      if (badge) badge.style.display = "none";
      const v = videoRef.current;
      if (v) {
        v.play().catch(() => {});
      }
    }, 500);
  }, []);

  const handlePointerOut = useCallback(() => {
    clearTimeout(timerRef.current);
    const badge = badgeRef.current;
    if (badge) badge.style.display = "grid";
    const v = videoRef.current;
    if (v) {
      v.pause();
      v.currentTime = 0;
    }
  }, []);

  const handleOpen = useCallback(() => {
    const list =
      lightboxItems && lightboxItems.length > 0 ? lightboxItems : [video];
    const items: LightboxItem[] = list.map((v) => ({ type: "video", data: v }));
    const index = Math.max(
      0,
      list.findIndex((v) => v.id === video.id),
    );
    open(items, index);
  }, [lightboxItems, video, open]);

  return (
    <div
      className="card mb-2 break-inside-avoid bg-surface-container-highest md:mb-3"
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      <div
        className="relative w-full"
        style={{ aspectRatio: `${width} / ${height}` }}
      >
        <video
          ref={videoRef}
          poster={image}
          muted
          loop
          preload="none"
          playsInline
          className={`h-full w-full scale-105 object-cover ${loaded ? "opacity-100" : "opacity-0"}`}
          onLoadedData={() => setLoaded(true)}
        >
          <source src={sdVideo.link} type={sdVideo.file_type} />
        </video>
        <img
          src={image}
          alt=""
          width={width}
          height={height}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-400 ${loaded ? "opacity-0" : "opacity-100"}`}
          loading="lazy"
        />

        <button
          type="button"
          onClick={handleOpen}
          className="absolute inset-0 z-1 cursor-zoom-in"
          aria-label={`View video ${id}`}
        />
      </div>

      <div ref={badgeRef} className="card-play-badge">
        <Play size={16} />
      </div>

      <div className="card-favorite-bar absolute right-0 bottom-0 left-0 z-2 flex justify-end bg-linear-to-t from-black/75 to-transparent p-1.25">
        <FavoriteButton type="videos" id={id} data={video} small />
      </div>
    </div>
  );
}
