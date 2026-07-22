"use client";

import { useState, useEffect, useCallback } from "react";
import CollectionCard from "@/components/CollectionCard";
import InfiniteScroll from "@/components/InfiniteScroll";
import type { PexelsCollection } from "@/types/pexels";

export default function CollectionGallery() {
  const [collections, setCollections] = useState<PexelsCollection[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  const fetchCollections = useCallback(async (pageNum: number, reset = false) => {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/collections/featured?page=${pageNum}&per_page=30`
      );
      const data = await res.json();

      setCollections((prev) =>
        reset ? data.collections : [...prev, ...data.collections]
      );
      setHasMore(Boolean(data.next_page));
    } catch {
      setHasMore(false);
    } finally {
      setLoading(false);
      setInitialLoading(false);
    }
  }, []);

  useEffect(() => {
     
    fetchCollections(1, true);
  }, [fetchCollections]);

  const loadMore = useCallback(() => {
    if (loading || !hasMore) return;
    const nextPage = page + 1;
    setPage(nextPage);
    fetchCollections(nextPage);
  }, [page, loading, hasMore, fetchCollections]);

  if (initialLoading) {
    return (
      <div className="md:grid md:grid-cols-2 xl:grid-cols-3 xl:gap-x-6">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center justify-between h-[72px] px-4 border-b border-outline-variant"
          >
            <div className="space-y-1">
              <div className="w-48 h-4 bg-surface-container-highest rounded animate-skeleton" />
              <div className="w-24 h-3 bg-surface-container-highest rounded animate-skeleton" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      {collections.length > 0 ? (
        <div className="md:grid md:grid-cols-2 xl:grid-cols-3 xl:gap-x-6">
          {collections.map((collection) => (
            <CollectionCard key={collection.id} collection={collection} />
          ))}
        </div>
      ) : (
        <div className="text-on-surface-variant text-center py-12 text-body-large">
          No collections found
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
