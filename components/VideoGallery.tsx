"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import VideoCard from "@/components/VideoCard";
import MasonryGrid from "@/components/MasonryGrid";
import InfiniteScroll from "@/components/InfiniteScroll";
import FilterBar from "@/components/FilterBar";
import GallerySkeleton from "@/components/GallerySkeleton";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
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
  const initialQueryRef = useRef(initialQuery);
  const abortRef = useRef<AbortController | null>(null);
  const isFirstRender = useRef(true);

  const filterKey = useDebouncedValue(`${orientation}|${size}`, 300);

  const fetchVideos = useCallback(
    async (
      pageNum: number,
      query: string,
      ori: string,
      sz: string,
      reset = false,
    ) => {
      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;

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

        const res = await fetch(endpoint, { signal: controller.signal });
        const data = await res.json();
        const newVideos = data.videos || [];

        setVideos((prev) => (reset ? newVideos : [...prev, ...newVideos]));
        setHasMore(Boolean(data.next_page));
      } catch (error) {
        if ((error as { name?: string } | null)?.name === "AbortError") return;
        setHasMore(false);
      } finally {
        if (abortRef.current === controller) {
          setLoading(false);
          setInitialLoading(false);
        }
      }
    },
    [],
  );

  useEffect(() => {
    const [ori, sz] = filterKey.split("|");

    if (isFirstRender.current) {
      isFirstRender.current = false;
      fetchVideos(1, initialQueryRef.current, ori, sz, true);
      return;
    }

    setPage(1);
    setVideos([]);
    setHasMore(true);
    fetchVideos(1, initialQueryRef.current, ori, sz, true);
  }, [filterKey, fetchVideos]);

  useEffect(() => {
    return () => abortRef.current?.abort();
  }, []);

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
        onOrientationChange={setOrientation}
        size={size}
        onSizeChange={setSize}
        color=""
        onColorChange={() => {}}
        showColor={false}
      />

      {initialLoading || (loading && videos.length === 0) ? (
        <GallerySkeleton />
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

      <InfiniteScroll
        hasMore={hasMore}
        loading={loading}
        onLoadMore={loadMore}
      />
    </>
  );
}
