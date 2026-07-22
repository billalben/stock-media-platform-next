import type { Metadata } from "next";
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
import BannerSection from "@/components/BannerSection";

export const metadata: Metadata = {
  title: "Pixstock - A large stock library",
  description:
    "Explore our exceptional collection of high-quality stock photos and videos.",
};

async function HomePageData() {
  try {
    const [photosRes, videosRes, collectionsRes] = await Promise.all([
      getCuratedPhotos(1, 10),
      getPopularVideos(1, 16),
      getFeaturedCollections(1, 18),
    ]);

    return { photosRes, videosRes, collectionsRes };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Failed to load content",
    };
  }
}

export default async function HomePage() {
  const data = await HomePageData();

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

            {"photosRes" in data && data.photosRes ? (
              <>
                <div className="relative">
                  <MasonryGrid>
                    {data.photosRes.photos.map((photo) => (
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
              </>
            ) : (
              <div className="text-on-surface-variant py-8 text-center">
                {"error" in data ? data.error : "Loading photos..."}
              </div>
            )}
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

            {"videosRes" in data && data.videosRes ? (
              <div className="relative">
                <MasonryGrid>
                  {data.videosRes.videos.map((video) => (
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
            ) : (
              <div className="text-on-surface-variant py-8 text-center">
                {"error" in data ? data.error : "Loading videos..."}
              </div>
            )}
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

            {"collectionsRes" in data && data.collectionsRes ? (
              <>
                <div className="md:grid md:grid-cols-2 xl:grid-cols-3 xl:gap-x-6">
                  {data.collectionsRes.collections.map((collection) => (
                    <CollectionCard
                      key={collection.id}
                      collection={collection}
                    />
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
            ) : (
              <div className="text-on-surface-variant py-8 text-center">
                {"error" in data ? data.error : "Loading collections..."}
              </div>
            )}
          </div>
        </section>
      </article>
    </main>
  );
}
