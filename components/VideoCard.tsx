"use client";

import { useRef, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { Play } from "lucide-react";
import type { PexelsVideo } from "@/types/pexels";
import FavoriteButton from "./FavoriteButton";

interface VideoCardProps {
  video: PexelsVideo;
}

export default function VideoCard({ video }: VideoCardProps) {
  const { id, width, height, image, video_files } = video;
  const videoRef = useRef<HTMLVideoElement>(null);
  const [loaded, setLoaded] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const sdVideo = video_files.find(
    (f) => f.quality === "sd" && f.width < 1000
  ) || video_files[0];

  const handleMouseEnter = useCallback(() => {
    timerRef.current = setTimeout(() => {
      videoRef.current?.play();
    }, 500);
  }, []);

  const handleMouseLeave = useCallback(() => {
    clearTimeout(timerRef.current);
    const v = videoRef.current;
    if (v) {
      v.pause();
      v.currentTime = 0;
    }
  }, []);

  return (
    <div
      className="card card-video break-inside-avoid mb-2 md:mb-3 bg-surface-container-highest"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative w-full" style={{ aspectRatio: `${width} / ${height}` }}>
        {loaded && (
          <video
            ref={videoRef}
            poster={image}
            muted
            loop
            preload="none"
            playsInline
            className="w-full h-full object-cover scale-105"
            onLoadedData={() => setLoaded(true)}
          >
            <source src={sdVideo.link} type={sdVideo.file_type} />
          </video>
        )}
        <Image
          src={image}
          alt=""
          width={width}
          height={height}
          className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-400 ${loaded ? "opacity-0" : "opacity-100"}`}
          loading="lazy"
        />
      </div>

      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/75 to-transparent p-[5px] flex justify-end z-[2]">
        <FavoriteButton type="videos" id={id} data={video} small />
      </div>

      <div className="absolute top-4 left-4 w-6 h-6 grid place-items-center bg-secondary-container text-on-secondary-container rounded-lg z-[2]">
        <Play size={16} />
      </div>

      <Link
        href={`/videos/${id}`}
        className="absolute inset-0 z-[1]"
        aria-label={`Video ${id}`}
      />
    </div>
  );
}
