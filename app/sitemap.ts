import type { MetadataRoute } from "next";
import { getCuratedPhotos, getPopularVideos } from "@/lib/pexels";
import { SITE_URL } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${SITE_URL}/photos`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/videos`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/collections`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  try {
    const [photos, videos] = await Promise.all([
      getCuratedPhotos(1, 12),
      getPopularVideos(1, 16),
    ]);

    return [
      ...routes,
      ...photos.photos.map((photo) => ({
        url: `${SITE_URL}/photos/${photo.id}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.6,
      })),
      ...videos.videos.map((video) => ({
        url: `${SITE_URL}/videos/${video.id}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.6,
      })),
    ];
  } catch {
    return routes;
  }
}
