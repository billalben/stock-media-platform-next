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
import type { PexelsCollection, PexelsPhoto, PexelsVideo } from "@/types/pexels";

export const metadata: Metadata = {
  title: "Pixstock - A large stock library",
  description:
    "Explore our exceptional collection of high-quality stock photos and videos.",
};

function SectionError({ message }: { message: string }) {
  return (
    <div className="text-on-surface-variant py-8 text-center">{message}</div>
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
      <div className="absolute -bottom-0.5 left-0 w-full pt-16 pb-6 grid place-items-center bg-linear-to-t from-background from-30% to-transparent z-1 pointer-events-none">
        <Link
          href="/photos"
          className="btn-primary h-10 px-6 rounded-full flex items-center gap-2 text-label-large pointer-events-auto"
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
      <div className="absolute -bottom-0.5 left-0 w-full pt-16 pb-6 grid place-items-center bg-linear-to-t from-background from-30% to-transparent z-1 pointer-events-none">
        <Link
          href="/videos"
          className="btn-primary h-10 px-6 rounded-full flex items-center gap-2 text-label-large pointer-events-auto"
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
      <div className="flex justify-center mt-3 md:mt-6">
        <Link
          href="/collections"
          className="btn-primary h-10 px-6 rounded-full flex items-center gap-2 text-label-large"
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
              className="text-title-large md:text-headline-small xl:text-headline-medium mb-3 md:mb-5 xl:mb-6"
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
              className="text-title-large md:text-headline-small xl:text-headline-medium mb-3 md:mb-5 xl:mb-6"
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
              className="text-title-large md:text-headline-small xl:text-headline-medium mb-3 md:mb-5 xl:mb-6"
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
