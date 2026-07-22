"use client";

import { useState, useEffect, useCallback } from "react";
import PhotoCard from "@/components/PhotoCard";
import MasonryGrid from "@/components/MasonryGrid";
import InfiniteScroll from "@/components/InfiniteScroll";
import FilterBar from "@/components/FilterBar";
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

  const fetchPhotos = useCallback(
    async (
      pageNum: number,
      query: string,
      ori: string,
      sz: string,
      clr: string,
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
        if (clr) params.set("color", clr);

        const endpoint = query
          ? `/api/photos/search?${params}`
          : `/api/photos/curated?${params}`;

        const res = await fetch(endpoint);
        const data = await res.json();

        setPhotos((prev) => (reset ? data.photos : [...prev, ...data.photos]));
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
     
    fetchPhotos(1, initialQuery, "", "", "", true);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const loadMore = useCallback(() => {
    if (loading || !hasMore) return;
    const nextPage = page + 1;
    setPage(nextPage);
    fetchPhotos(nextPage, initialQuery, orientation, size, color);
  }, [page, loading, hasMore, initialQuery, orientation, size, color, fetchPhotos]);

  return (
    <>
      <FilterBar
        orientation={orientation}
        onOrientationChange={(v) => {
          setOrientation(v);
          setPage(1);
          setPhotos([]);
          setHasMore(true);
          fetchPhotos(1, initialQuery, v, size, color, true);
        }}
        size={size}
        onSizeChange={(v) => {
          setSize(v);
          setPage(1);
          setPhotos([]);
          setHasMore(true);
          fetchPhotos(1, initialQuery, orientation, v, color, true);
        }}
        color={color}
        onColorChange={(v) => {
          setColor(v);
          setPage(1);
          setPhotos([]);
          setHasMore(true);
          fetchPhotos(1, initialQuery, orientation, size, v, true);
        }}
      />

      {initialLoading ? (
        <MasonryGrid>
          {Array.from({ length: 18 }).map((_, i) => (
            <div
              key={i}
              className="break-inside-avoid mb-2 md:mb-3"
            >
              <div className="bg-surface-container-highest rounded-xl animate-skeleton aspect-[2/3]" />
            </div>
          ))}
        </MasonryGrid>
      ) : photos.length > 0 ? (
        <MasonryGrid>
          {photos.map((photo) => (
            <PhotoCard key={photo.id} photo={photo} />
          ))}
        </MasonryGrid>
      ) : (
        <div className="text-on-surface-variant text-center py-12 text-body-large">
          No photos found
        </div>
      )}

      <InfiniteScroll hasMore={hasMore} loading={loading} onLoadMore={loadMore} />
    </>
  );
}
