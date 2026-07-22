import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getPhotoDetail, searchPhotos } from "@/lib/pexels";
import PhotoCard from "@/components/PhotoCard";
import MasonryGrid from "@/components/MasonryGrid";
import DetailHeader from "@/components/DetailHeader";
import type { PexelsPhoto, PexelsPhotosResponse } from "@/types/pexels";

interface Props {
  params: Promise<{ id: string }>;
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
        <div className="container xl:max-w-360 xl:grid xl:grid-cols-[1fr_minmax(0,1fr)] xl:items-start xl:gap-6">
          {/* Photo Preview */}
          <div className="detail-wrapper h-147 xl:h-197 grid grid-rows-[1fr_max-content] place-items-center xl:sticky xl:top-19">
            <div className="max-w-full max-h-full mx-auto rounded-2xl overflow-hidden mb-2 xl:max-h-190">
              <Image
                src={photo.src.large2x}
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
                className="max-w-full max-h-full w-auto h-auto object-contain"
                priority
              />
            </div>
            <p className="text-title-small text-center">
              Photograph by{" "}
              <a
                href={photo.photographer_url}
                target="_blank"
                rel="noopener"
                className="text-primary inline hover:underline"
              >
                {photo.photographer}
              </a>
            </p>
          </div>

          {/* Detail Info & Similar */}
          <div>
            <h1 className="text-title-large md:text-headline-medium xl:mt-10 mt-8 mb-4">
              {photo.alt || "Photo Detail"}
            </h1>

            {similar && similar.photos.length > 0 && (
              <section>
                <h2 className="text-title-large mb-3 md:mb-5">
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
