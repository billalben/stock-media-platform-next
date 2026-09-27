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
      <div className="my-4 flex w-full overflow-hidden rounded-full border border-outline">
        <button
          onClick={() => setTab("photos")}
          className={`flex h-10 flex-1 items-center justify-center gap-2 px-3 text-label-large ${tab === "photos" ? "bg-secondary-container text-on-secondary-container" : "text-on-surface"}`}
        >
          {/* eslint-disable-next-line jsx-a11y/alt-text */}
          <Image size={28} aria-hidden="true" />
          Photos
        </button>
        <button
          onClick={() => setTab("videos")}
          className={`flex h-10 flex-1 items-center justify-center gap-2 border-l border-outline px-3 text-label-large ${tab === "videos" ? "bg-secondary-container text-on-secondary-container" : "text-on-surface"}`}
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
            <div className="py-12 text-center text-body-large text-on-surface-variant">
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
            <div className="py-12 text-center text-body-large text-on-surface-variant">
              No favorite videos yet
            </div>
          )}
        </>
      )}
    </>
  );
}
