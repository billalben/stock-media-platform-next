import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import {
  getCuratedPhotos,
  getPopularVideos,
  getFeaturedCollections,
} from "@/lib/pexels";
import PhotoCard from "@/components/PhotoCard";
import VideoCard from "@/components/VideoCard";
import CollectionCard from "@/components/CollectionCard";
import MasonryGrid from "@/components/MasonryGrid";
import GallerySkeleton from "@/components/GallerySkeleton";
import CollectionListSkeleton from "@/components/CollectionListSkeleton";
import BannerSection from "@/components/BannerSection";
import type {
  PexelsCollection,
  PexelsPhoto,
  PexelsVideo,
} from "@/types/pexels";

export const metadata: Metadata = {
  title: "Pixstock - A large stock library",
  description:
    "Explore our exceptional collection of high-quality stock photos and videos.",
};

function SectionError({ message }: { message: string }) {
  return (
    <div className="py-8 text-center text-on-surface-variant">{message}</div>
  );
}

async function FeaturedPhotos() {
  let photos: PexelsPhoto[] = [];
  let errorMessage: string | null = null;

  try {
    photos = (await getCuratedPhotos(1, 10)).photos;
  } catch (error) {
    errorMessage =
      error instanceof Error ? error.message : "Failed to load photos";
  }

  if (errorMessage) return <SectionError message={errorMessage} />;

  return (
    <div className="relative">
      <MasonryGrid>
        {photos.map((photo) => (
          <PhotoCard key={photo.id} photo={photo} />
        ))}
      </MasonryGrid>
      <div className="pointer-events-none absolute -bottom-0.5 left-0 z-1 grid w-full place-items-center bg-linear-to-t from-background from-30% to-transparent pt-16 pb-6">
        <Link
          href="/photos"
          className="btn-primary pointer-events-auto flex h-10 items-center gap-2 rounded-full px-6 text-label-large"
        >
          Explore more
        </Link>
      </div>
    </div>
  );
}

async function PopularVideos() {
  let videos: PexelsVideo[] = [];
  let errorMessage: string | null = null;

  try {
    videos = (await getPopularVideos(1, 16)).videos;
  } catch (error) {
    errorMessage =
      error instanceof Error ? error.message : "Failed to load videos";
  }

  if (errorMessage) return <SectionError message={errorMessage} />;

  return (
    <div className="relative">
      <MasonryGrid>
        {videos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </MasonryGrid>
      <div className="pointer-events-none absolute -bottom-0.5 left-0 z-1 grid w-full place-items-center bg-linear-to-t from-background from-30% to-transparent pt-16 pb-6">
        <Link
          href="/videos"
          className="btn-primary pointer-events-auto flex h-10 items-center gap-2 rounded-full px-6 text-label-large"
        >
          Explore more
        </Link>
      </div>
    </div>
  );
}

async function FeaturedCollections() {
  let collections: PexelsCollection[] = [];
  let errorMessage: string | null = null;

  try {
    collections = (await getFeaturedCollections(1, 18)).collections;
  } catch (error) {
    errorMessage =
      error instanceof Error ? error.message : "Failed to load collections";
  }

  if (errorMessage) return <SectionError message={errorMessage} />;

  return (
    <>
      <div className="md:grid md:grid-cols-2 xl:grid-cols-3 xl:gap-x-6">
        {collections.map((collection) => (
          <CollectionCard key={collection.id} collection={collection} />
        ))}
      </div>
      <div className="mt-3 flex justify-center md:mt-6">
        <Link
          href="/collections"
          className="btn-primary flex h-10 items-center gap-2 rounded-full px-6 text-label-large"
        >
          More Collections
        </Link>
      </div>
    </>
  );
}

export default function HomePage() {
  return (
    <main className="flex-1 pt-3">
      <article>
        <BannerSection />

        {/* Featured Photos */}
        <section
          className="section mb-6 md:mb-9"
          aria-labelledby="featured-label"
        >
          <div className="container">
            <h2
              id="featured-label"
              className="mb-3 text-title-large md:mb-5 md:text-headline-small xl:mb-6 xl:text-headline-medium"
            >
              Featured photos
            </h2>

            <Suspense fallback={<GallerySkeleton count={10} />}>
              <FeaturedPhotos />
            </Suspense>
          </div>
        </section>

        {/* Popular Videos */}
        <section
          className="section mb-6 md:mb-9"
          aria-labelledby="popular-video-label"
        >
          <div className="container">
            <h2
              id="popular-video-label"
              className="mb-3 text-title-large md:mb-5 md:text-headline-small xl:mb-6 xl:text-headline-medium"
            >
              Popular videos
            </h2>

            <Suspense fallback={<GallerySkeleton count={16} />}>
              <PopularVideos />
            </Suspense>
          </div>
        </section>

        {/* Featured Collections */}
        <section
          className="section mb-6 md:mb-9"
          aria-labelledby="collection-label"
        >
          <div className="container">
            <h2
              id="collection-label"
              className="mb-3 text-title-large md:mb-5 md:text-headline-small xl:mb-6 xl:text-headline-medium"
            >
              Featured collections
            </h2>

            <Suspense fallback={<CollectionListSkeleton count={18} />}>
              <FeaturedCollections />
            </Suspense>
          </div>
        </section>
      </article>
    </main>
  );
}
