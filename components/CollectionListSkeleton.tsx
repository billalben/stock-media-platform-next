interface CollectionListSkeletonProps {
  count?: number;
}

export default function CollectionListSkeleton({
  count = 12,
}: CollectionListSkeletonProps) {
  return (
    <div className="md:grid md:grid-cols-2 xl:grid-cols-3 xl:gap-x-6">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="flex h-18 items-center justify-between border-b border-outline-variant px-4"
        >
          <div className="space-y-1">
            <div className="h-4 w-48 animate-skeleton rounded bg-surface-container-highest" />
            <div className="h-3 w-24 animate-skeleton rounded bg-surface-container-highest" />
          </div>
        </div>
      ))}
    </div>
  );
}
