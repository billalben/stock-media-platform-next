import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCollectionMedia, PexelsError } from "@/lib/pexels";
import PhotoCard from "@/components/PhotoCard";
import VideoCard from "@/components/VideoCard";
import MasonryGrid from "@/components/MasonryGrid";
import CollectionDetailHeader from "@/components/CollectionDetailHeader";
import ErrorState from "@/components/ErrorState";
import { getFriendlyError } from "@/lib/error-messages";
import type { CollectionMediaItem, PexelsPhoto, PexelsVideo } from "@/types/pexels";

interface Props {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ title?: string }>;
}

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const { title } = await searchParams;
  return {
    title: title ? `${title} - Pixstock` : "Collection - Pixstock",
    description: `Browse media in the ${title || "collection"}.`,
  };
}

function isPhoto(
  item: CollectionMediaItem,
): item is PexelsPhoto & { type: "Photo" } {
  return item.type === "Photo";
}

export default async function CollectionDetailPage({
  params,
  searchParams,
}: Props) {
  const { id } = await params;
  const { title } = await searchParams;

  if (!id) notFound();

  let media: CollectionMediaItem[] = [];
  let loadError: unknown = null;

  try {
    const data = await getCollectionMedia(id, 1, 60);
    media = data.media || [];
  } catch (error) {
    loadError = error;
  }

  if (loadError) {
    if (loadError instanceof PexelsError && loadError.status === 404) {
      notFound();
    }
    const status = loadError instanceof PexelsError ? loadError.status : undefined;
    return (
      <>
        <CollectionDetailHeader title={title} />
        <main className="flex-1 pt-16">
          <div className="container">
            <ErrorState {...getFriendlyError(status)} />
          </div>
        </main>
      </>
    );
  }

  const photos = media.filter(isPhoto);
  const videos = media.filter(
    (item): item is PexelsVideo & { type: "Video" } => item.type === "Video",
  );

  return (
    <>
      <CollectionDetailHeader title={title} />

      <main className="flex-1 pt-16">
        <div className="container">
          <h1 className="mb-4 text-title-large capitalize md:text-headline-small xl:text-headline-medium">
            {title || "Collection"}
          </h1>

          {media.length > 0 ? (
            <MasonryGrid>
              {media.map((item) =>
                isPhoto(item) ? (
                  <PhotoCard
                    key={`photo-${item.id}`}
                    photo={item}
                    lightboxItems={photos}
                  />
                ) : (
                  <VideoCard
                    key={`video-${item.id}`}
                    video={item}
                    lightboxItems={videos}
                  />
                ),
              )}
            </MasonryGrid>
          ) : (
            <div className="py-12 text-center text-body-large text-on-surface-variant">
              No media in this collection
            </div>
          )}
        </div>
      </main>
    </>
  );
}
