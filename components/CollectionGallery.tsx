"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import CollectionCard from "@/components/CollectionCard";
import InfiniteScroll from "@/components/InfiniteScroll";
import CollectionListSkeleton from "@/components/CollectionListSkeleton";
import ErrorState from "@/components/ErrorState";
import { getFriendlyError } from "@/lib/error-messages";
import type { PexelsCollection } from "@/types/pexels";

export default function CollectionGallery() {
  const [collections, setCollections] = useState<PexelsCollection[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [errorStatus, setErrorStatus] = useState<number | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const fetchCollections = useCallback(
    async (pageNum: number, reset = false) => {
      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      setLoading(true);
      try {
        const res = await fetch(
          `/api/collections/featured?page=${pageNum}&per_page=30`,
          { signal: controller.signal },
        );
        if (!res.ok) {
          setErrorStatus(res.status);
          setHasMore(false);
          return;
        }
        setErrorStatus(null);
        const data = await res.json();

        setCollections((prev) =>
          reset ? data.collections : [...prev, ...data.collections],
        );
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
    fetchCollections(1, true);
  }, [fetchCollections]);

  useEffect(() => {
    return () => abortRef.current?.abort();
  }, []);

  const loadMore = useCallback(() => {
    if (loading || !hasMore) return;
    const nextPage = page + 1;
    setPage(nextPage);
    fetchCollections(nextPage);
  }, [page, loading, hasMore, fetchCollections]);

  const retry = useCallback(() => {
    setErrorStatus(null);
    setPage(1);
    setCollections([]);
    setHasMore(true);
    fetchCollections(1, true);
  }, [fetchCollections]);

  if (initialLoading) {
    return <CollectionListSkeleton />;
  }

  if (errorStatus !== null && collections.length === 0) {
    return (
      <ErrorState {...getFriendlyError(errorStatus)} onRetry={retry} />
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
        <div className="py-12 text-center text-body-large text-on-surface-variant">
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
