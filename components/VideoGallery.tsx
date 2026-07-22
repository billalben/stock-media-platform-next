"use client";

import { useState, useEffect, useCallback } from "react";
import VideoCard from "@/components/VideoCard";
import MasonryGrid from "@/components/MasonryGrid";
import InfiniteScroll from "@/components/InfiniteScroll";
import FilterBar from "@/components/FilterBar";
import type { PexelsVideo } from "@/types/pexels";

interface VideoGalleryProps {
  initialQuery?: string;
}

export default function VideoGallery({ initialQuery = "" }: VideoGalleryProps) {
  const [videos, setVideos] = useState<PexelsVideo[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [orientation, setOrientation] = useState("");
  const [size, setSize] = useState("");

  const fetchVideos = useCallback(
    async (
      pageNum: number,
      query: string,
      ori: string,
      sz: string,
      reset = false
    ) => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        params.set("page", String(pageNum));
        params.set("per_page", "30");
        if (query) params.set("query", query);
        if (ori) params.set("orientation", ori);
        if (sz) params.set("size", sz);

        const endpoint = query
          ? `/api/videos/search?${params}`
          : `/api/videos/popular?${params}`;

        const res = await fetch(endpoint);
        const data = await res.json();
        const newVideos = data.videos || [];

        setVideos((prev) => (reset ? newVideos : [...prev, ...newVideos]));
        setHasMore(Boolean(data.next_page));
      } catch {
        setHasMore(false);
      } finally {
        setLoading(false);
        setInitialLoading(false);
      }
    },
    []
  );

  useEffect(() => {
     
    fetchVideos(1, initialQuery, "", "", true);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const loadMore = useCallback(() => {
    if (loading || !hasMore) return;
    const nextPage = page + 1;
    setPage(nextPage);
    fetchVideos(nextPage, initialQuery, orientation, size);
  }, [page, loading, hasMore, initialQuery, orientation, size, fetchVideos]);

  return (
    <>
      <FilterBar
        orientation={orientation}
        onOrientationChange={(v) => {
          setOrientation(v);
          setPage(1);
          setVideos([]);
          setHasMore(true);
          fetchVideos(1, initialQuery, v, size, true);
        }}
        size={size}
        onSizeChange={(v) => {
          setSize(v);
          setPage(1);
          setVideos([]);
          setHasMore(true);
          fetchVideos(1, initialQuery, orientation, v, true);
        }}
        color=""
        onColorChange={() => {}}
        showColor={false}
      />

      {initialLoading ? (
        <MasonryGrid>
          {Array.from({ length: 18 }).map((_, i) => (
            <div key={i} className="break-inside-avoid mb-2 md:mb-3">
              <div className="bg-surface-container-highest rounded-xl animate-skeleton aspect-[2/3]" />
            </div>
          ))}
        </MasonryGrid>
      ) : videos.length > 0 ? (
        <MasonryGrid>
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </MasonryGrid>
      ) : (
        <div className="text-on-surface-variant text-center py-12 text-body-large">
          No videos found
        </div>
      )}

      <InfiniteScroll hasMore={hasMore} loading={loading} onLoadMore={loadMore} />
    </>
  );
}
