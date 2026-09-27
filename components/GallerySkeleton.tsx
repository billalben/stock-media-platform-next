import MasonryGrid from "./MasonryGrid";

interface GallerySkeletonProps {
  count?: number;
}

export default function GallerySkeleton({ count = 18 }: GallerySkeletonProps) {
  return (
    <MasonryGrid>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="break-inside-avoid mb-2 md:mb-3">
          <div className="bg-surface-container-highest rounded-xl animate-skeleton aspect-2/3" />
        </div>
      ))}
    </MasonryGrid>
  );
}
