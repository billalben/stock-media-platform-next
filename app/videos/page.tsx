import type { Metadata } from "next";
import { Suspense } from "react";
import VideoGallery from "@/components/VideoGallery";
import GallerySkeleton from "@/components/GallerySkeleton";

export const metadata: Metadata = {
  title: "Videos - Pixstock",
  description: "Browse our curated collection of high-quality stock videos.",
};

interface VideosPageProps {
  searchParams: Promise<{ query?: string }>;
}

export default async function VideosPage({ searchParams }: VideosPageProps) {
  const { query = "" } = await searchParams;

  return (
    <main className="flex-1 pt-3">
      <div className="container">
        <h1 className="mb-4 text-title-large capitalize md:text-headline-small xl:text-headline-medium">
          Videos
        </h1>

        <Suspense fallback={<GallerySkeleton />}>
          <VideoGallery key={query} initialQuery={query} />
        </Suspense>
      </div>
    </main>
  );
}
