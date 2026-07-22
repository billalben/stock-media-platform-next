"use client";

import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";

interface InfiniteScrollProps {
  hasMore: boolean;
  loading: boolean;
  onLoadMore: () => void;
}

export default function InfiniteScroll({ hasMore, loading, onLoadMore }: InfiniteScrollProps) {
  const { sentinelRef } = useInfiniteScroll({ hasMore, loading, onLoadMore });

  if (!hasMore && !loading) return null;

  return (
    <div ref={sentinelRef} className="flex justify-center py-5">
      {loading && (
        <div className="w-10 h-10 border-4 border-primary border-r-transparent rounded-full animate-spin-loader" />
      )}
    </div>
  );
}
