import GallerySkeleton from "@/components/GallerySkeleton";

export default function Loading() {
  return (
    <main className="flex-1 pt-16">
      <div className="container">
        <div className="w-64 h-8 bg-surface-container-highest rounded animate-skeleton mb-4" />
        <GallerySkeleton />
      </div>
    </main>
  );
}
