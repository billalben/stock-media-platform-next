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
          className="flex items-center justify-between h-18 px-4 border-b border-outline-variant"
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
