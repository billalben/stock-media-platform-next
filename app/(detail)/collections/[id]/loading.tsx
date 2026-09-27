import GallerySkeleton from "@/components/GallerySkeleton";

export default function Loading() {
  return (
    <main className="flex-1 pt-16">
      <div className="container">
        <div className="mb-4 h-8 w-64 animate-skeleton rounded bg-surface-container-highest" />
        <GallerySkeleton />
      </div>
    </main>
  );
}
