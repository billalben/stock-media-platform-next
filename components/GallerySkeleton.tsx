import MasonryGrid from "./MasonryGrid";

interface GallerySkeletonProps {
  count?: number;
}

export default function GallerySkeleton({ count = 18 }: GallerySkeletonProps) {
  return (
    <MasonryGrid>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="mb-2 break-inside-avoid md:mb-3">
          <div className="aspect-2/3 animate-skeleton rounded-xl bg-surface-container-highest" />
        </div>
      ))}
    </MasonryGrid>
  );
}
