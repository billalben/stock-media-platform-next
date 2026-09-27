import type { Metadata } from "next";
import { Suspense } from "react";
import PhotoGallery from "@/components/PhotoGallery";
import GallerySkeleton from "@/components/GallerySkeleton";

export const metadata: Metadata = {
  title: "Photos - Pixstock",
  description: "Browse our curated collection of high-quality stock photos.",
};

interface PhotosPageProps {
  searchParams: Promise<{ query?: string }>;
}

export default async function PhotosPage({ searchParams }: PhotosPageProps) {
  const { query = "" } = await searchParams;

  return (
    <main className="flex-1 pt-3">
      <div className="container">
        <h1 className="text-title-large md:text-headline-small xl:text-headline-medium mb-4 capitalize">
          Photos
        </h1>

        <Suspense fallback={<GallerySkeleton />}>
          <PhotoGallery key={query} initialQuery={query} />
        </Suspense>
      </div>
    </main>
  );
}
