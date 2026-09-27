import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPopularVideos, getVideoDetail } from "@/lib/pexels";
import DetailHeader from "@/components/DetailHeader";
import type { PexelsVideo } from "@/types/pexels";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  try {
    const { videos } = await getPopularVideos(1, 16);
    return videos.map((video) => ({ id: String(video.id) }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  try {
    const video = await getVideoDetail(Number(id));
    return {
      title: `Video by ${video.user.name} - Pixstock`,
      description: `Stock video by ${video.user.name}`,
    };
  } catch {
    return { title: "Video - Pixstock" };
  }
}

function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default async function VideoDetailPage({ params }: Props) {
  const { id } = await params;
  const videoId = Number(id);

  if (!videoId) notFound();

  let video: PexelsVideo;

  try {
    video = await getVideoDetail(videoId);
  } catch {
    notFound();
  }

  const hdVideo = video.video_files.find((f) => f.quality === "hd");
  const bestVideo = hdVideo || video.video_files[0];

  const downloads = video.video_files.map((f) => ({
    label: `${f.quality.toUpperCase()} (${f.width}x${f.height})`,
    url: f.link,
  }));

  return (
    <>
      <DetailHeader
        downloads={downloads}
        favoriteType="videos"
        favoriteId={video.id}
        favoriteData={video}
      />

      <main className="flex-1 pt-16">
        <div className="container xl:grid xl:max-w-360 xl:grid-cols-[1fr_minmax(0,1fr)] xl:items-start xl:gap-6">
          {/* Video Player */}
          <div className="detail-wrapper grid h-147 grid-rows-[1fr_max-content] place-items-center xl:sticky xl:top-19 xl:h-197">
            <div className="mx-auto mb-2 max-h-full max-w-full overflow-hidden rounded-2xl xl:max-h-190">
              <video
                src={bestVideo.link}
                poster={video.image}
                controls
                className="h-auto max-h-full w-auto max-w-full object-contain"
                style={{ aspectRatio: `${video.width} / ${video.height}` }}
              >
                {video.video_files.map((f) => (
                  <source key={f.id} src={f.link} type={f.file_type} />
                ))}
              </video>
            </div>
            <p className="text-center text-title-small">
              Video by{" "}
              <a
                href={video.user.url}
                target="_blank"
                rel="noopener"
                className="inline text-primary hover:underline"
              >
                {video.user.name}
              </a>{" "}
              - {formatDuration(video.duration)}
            </p>
          </div>

          {/* Detail Info */}
          <div>
            <h1 className="mt-8 mb-4 text-title-large md:text-headline-medium xl:mt-10">
              Video Detail
            </h1>

            <div className="space-y-2">
              <p className="text-body-medium text-on-surface-variant">
                Resolution: {video.width}x{video.height}
              </p>
              <p className="text-body-medium text-on-surface-variant">
                Duration: {formatDuration(video.duration)}
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
