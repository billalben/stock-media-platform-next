import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCollectionMedia } from "@/lib/pexels";
import PhotoCard from "@/components/PhotoCard";
import VideoCard from "@/components/VideoCard";
import MasonryGrid from "@/components/MasonryGrid";
import type { CollectionMediaItem, PexelsPhoto } from "@/types/pexels";

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

function isPhoto(item: CollectionMediaItem): item is PexelsPhoto & { type: "Photo" } {
  return item.type === "Photo";
}

export default async function CollectionDetailPage({ params, searchParams }: Props) {
  const { id } = await params;
  const { title } = await searchParams;

  if (!id) notFound();

  let media: CollectionMediaItem[] = [];

  try {
    const data = await getCollectionMedia(id, 1, 60);
    media = data.media || [];
  } catch {
    notFound();
  }

  return (
    <main className="flex-1 pt-3">
      <div className="container">
        <h1 className="text-title-large md:text-headline-small xl:text-headline-medium mb-4 capitalize">
          {title || "Collection"}
        </h1>

        {media.length > 0 ? (
          <MasonryGrid>
            {media.map((item) =>
              isPhoto(item) ? (
                <PhotoCard key={`photo-${item.id}`} photo={item} />
              ) : (
                <VideoCard key={`video-${item.id}`} video={item} />
              )
            )}
          </MasonryGrid>
        ) : (
          <div className="text-on-surface-variant text-center py-12 text-body-large">
            No media in this collection
          </div>
        )}
      </div>
    </main>
  );
}
