import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCuratedPhotos, getPhotoDetail, searchPhotos } from "@/lib/pexels";
import PhotoCard from "@/components/PhotoCard";
import MasonryGrid from "@/components/MasonryGrid";
import DetailHeader from "@/components/DetailHeader";
import type { PexelsPhoto, PexelsPhotosResponse } from "@/types/pexels";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  try {
    const { photos } = await getCuratedPhotos(1, 12);
    return photos.map((photo) => ({ id: String(photo.id) }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  try {
    const photo = await getPhotoDetail(Number(id));
    return {
      title: `${photo.alt || "Photo"} by ${photo.photographer} - Pixstock`,
      description: photo.alt || `Photo by ${photo.photographer}`,
    };
  } catch {
    return { title: "Photo - Pixstock" };
  }
}

export default async function PhotoDetailPage({ params }: Props) {
  const { id } = await params;
  const photoId = Number(id);

  if (!photoId) notFound();

  let photo: PexelsPhoto;
  let similar: PexelsPhotosResponse | null = null;

  try {
    photo = await getPhotoDetail(photoId);

    try {
      similar = await searchPhotos(photo.alt || "nature", 1, 12);
    } catch {
      similar = null;
    }
  } catch {
    notFound();
  }

  const downloads = [
    { label: "Original", url: photo.src.original },
    { label: "Large", url: photo.src.large2x },
    { label: "Medium", url: photo.src.large },
    { label: "Small", url: photo.src.medium },
  ];

  return (
    <>
      <DetailHeader
        downloads={downloads}
        favoriteType="photos"
        favoriteId={photo.id}
        favoriteData={photo}
      />

      <main className="flex-1 pt-16">
        <div className="container xl:grid xl:max-w-360 xl:grid-cols-[1fr_minmax(0,1fr)] xl:items-start xl:gap-6">
          {/* Photo Preview */}
          <div className="detail-wrapper grid h-147 grid-rows-[1fr_max-content] place-items-center xl:sticky xl:top-19 xl:h-197">
            <div className="mx-auto mb-2 max-h-full max-w-full overflow-hidden rounded-2xl xl:max-h-190">
              <img
                src={photo.src.large2x}
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
                className="h-auto max-h-full w-auto max-w-full object-contain"
                loading="eager"
                fetchPriority="high"
              />
            </div>
            <p className="text-center text-title-small">
              Photograph by{" "}
              <a
                href={photo.photographer_url}
                target="_blank"
                rel="noopener"
                className="inline text-primary hover:underline"
              >
                {photo.photographer}
              </a>
            </p>
          </div>

          {/* Detail Info & Similar */}
          <div>
            <h1 className="mt-8 mb-4 text-title-large md:text-headline-medium xl:mt-10">
              {photo.alt || "Photo Detail"}
            </h1>

            {similar && similar.photos.length > 0 && (
              <section>
                <h2 className="mb-3 text-title-large md:mb-5">
                  More like this
                </h2>
                <MasonryGrid>
                  {similar.photos
                    .filter((p) => p.id !== photo.id)
                    .slice(0, 9)
                    .map((p) => (
                      <PhotoCard key={p.id} photo={p} />
                    ))}
                </MasonryGrid>
              </section>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
