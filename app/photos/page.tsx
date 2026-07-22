import type { Metadata } from "next";
import { Suspense } from "react";
import PhotoGallery from "@/components/PhotoGallery";

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

        <Suspense
          fallback={
            <div className="columns-2 md:columns-3 gap-2 md:gap-3">
              {Array.from({ length: 18 }).map((_, i) => (
                <div key={i} className="break-inside-avoid mb-2 md:mb-3">
                  <div className="bg-surface-container-highest rounded-xl animate-skeleton aspect-[2/3]" />
                </div>
              ))}
            </div>
          }
        >
          <PhotoGallery key={query} initialQuery={query} />
        </Suspense>
      </div>
    </main>
  );
}
