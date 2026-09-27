"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import PhotoCard from "@/components/PhotoCard";
import MasonryGrid from "@/components/MasonryGrid";
import InfiniteScroll from "@/components/InfiniteScroll";
import FilterBar from "@/components/FilterBar";
import GallerySkeleton from "@/components/GallerySkeleton";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import type { PexelsPhoto } from "@/types/pexels";

interface PhotoGalleryProps {
  initialQuery?: string;
}

export default function PhotoGallery({ initialQuery = "" }: PhotoGalleryProps) {
  const [photos, setPhotos] = useState<PexelsPhoto[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [orientation, setOrientation] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const initialQueryRef = useRef(initialQuery);
  const abortRef = useRef<AbortController | null>(null);
  const isFirstRender = useRef(true);

  const filterKey = useDebouncedValue(`${orientation}|${size}|${color}`, 300);

  const fetchPhotos = useCallback(
    async (
      pageNum: number,
      query: string,
      ori: string,
      sz: string,
      clr: string,
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
        if (clr) params.set("color", clr);

        const endpoint = query
          ? `/api/photos/search?${params}`
          : `/api/photos/curated?${params}`;

        const res = await fetch(endpoint, { signal: controller.signal });
        const data = await res.json();
        const newPhotos = data.photos || [];

        setPhotos((prev) => (reset ? newPhotos : [...prev, ...newPhotos]));
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
    const [ori, sz, clr] = filterKey.split("|");

    if (isFirstRender.current) {
      isFirstRender.current = false;
      fetchPhotos(1, initialQueryRef.current, ori, sz, clr, true);
      return;
    }

    setPage(1);
    setPhotos([]);
    setHasMore(true);
    fetchPhotos(1, initialQueryRef.current, ori, sz, clr, true);
  }, [filterKey, fetchPhotos]);

  useEffect(() => {
    return () => abortRef.current?.abort();
  }, []);

  const loadMore = useCallback(() => {
    if (loading || !hasMore) return;
    const nextPage = page + 1;
    setPage(nextPage);
    fetchPhotos(nextPage, initialQuery, orientation, size, color);
  }, [
    page,
    loading,
    hasMore,
    initialQuery,
    orientation,
    size,
    color,
    fetchPhotos,
  ]);

  return (
    <>
      <FilterBar
        orientation={orientation}
        onOrientationChange={setOrientation}
        size={size}
        onSizeChange={setSize}
        color={color}
        onColorChange={setColor}
      />

      {initialLoading || (loading && photos.length === 0) ? (
        <GallerySkeleton />
      ) : photos.length > 0 ? (
        <MasonryGrid>
          {photos.map((photo) => (
            <PhotoCard key={photo.id} photo={photo} />
          ))}
        </MasonryGrid>
      ) : (
        <div className="py-12 text-center text-body-large text-on-surface-variant">
          No photos found
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
