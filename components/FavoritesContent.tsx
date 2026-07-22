"use client";

import { useState } from "react";
import { Image, Video } from "lucide-react";
import { useFavorites } from "@/hooks/useFavorites";
import PhotoCard from "@/components/PhotoCard";
import VideoCard from "@/components/VideoCard";
import MasonryGrid from "@/components/MasonryGrid";
import type { PexelsPhoto, PexelsVideo } from "@/types/pexels";

type TabType = "photos" | "videos";

export default function FavoritesContent() {
  const { getFavoritesByType } = useFavorites();
  const [tab, setTab] = useState<TabType>("photos");

  const photos = getFavoritesByType("photos") as PexelsPhoto[];
  const videos = getFavoritesByType("videos") as PexelsVideo[];

  return (
    <>
      {/* Segment toggle */}
      <div className="flex border border-outline rounded-full overflow-hidden my-4 max-w-xs">
        <button
          onClick={() => setTab("photos")}
          className={`flex-1 flex justify-center items-center gap-2 h-10 px-3 text-label-large
            ${tab === "photos" ? "bg-secondary-container text-on-secondary-container" : "text-on-surface"}`}
        >
          {/* eslint-disable-next-line jsx-a11y/alt-text */}
          <Image size={28} aria-hidden="true" />
          Photos
        </button>
        <button
          onClick={() => setTab("videos")}
          className={`flex-1 flex justify-center items-center gap-2 h-10 px-3 text-label-large border-l border-outline
            ${tab === "videos" ? "bg-secondary-container text-on-secondary-container" : "text-on-surface"}`}
        >
          <Video size={28} />
          Videos
        </button>
      </div>

      {tab === "photos" && (
        <>
          {photos.length > 0 ? (
            <MasonryGrid>
              {photos.map((photo) => (
                <PhotoCard key={photo.id} photo={photo} />
              ))}
            </MasonryGrid>
          ) : (
            <div className="text-on-surface-variant text-center py-12 text-body-large">
              No favorite photos yet
            </div>
          )}
        </>
      )}

      {tab === "videos" && (
        <>
          {videos.length > 0 ? (
            <MasonryGrid>
              {videos.map((video) => (
                <VideoCard key={video.id} video={video} />
              ))}
            </MasonryGrid>
          ) : (
            <div className="text-on-surface-variant text-center py-12 text-body-large">
              No favorite videos yet
            </div>
          )}
        </>
      )}
    </>
  );
}
