"use client";

import { useState, useEffect, useCallback } from "react";
import VideoCard from "@/components/VideoCard";
import MasonryGrid from "@/components/MasonryGrid";
import InfiniteScroll from "@/components/InfiniteScroll";
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

  const fetchVideos = useCallback(
    async (pageNum: number, query: string, reset = false) => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        params.set("page", String(pageNum));
        params.set("per_page", "30");
        if (query) params.set("query", query);

        const endpoint = query
          ? `/api/videos/search?${params}`
          : `/api/videos/popular?${params}`;

        const res = await fetch(endpoint);
        const data = await res.json();

        setVideos((prev) => (reset ? data.videos : [...prev, ...data.videos]));
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
     
    fetchVideos(1, initialQuery, true);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const loadMore = useCallback(() => {
    if (loading || !hasMore) return;
    const nextPage = page + 1;
    setPage(nextPage);
    fetchVideos(nextPage, initialQuery);
  }, [page, loading, hasMore, initialQuery, fetchVideos]);

  return (
    <>
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
