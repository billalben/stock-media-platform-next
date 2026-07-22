const PEXELS_API_BASE = "https://api.pexels.com/v1";
const PEXELS_VIDEOS_API_BASE = "https://api.pexels.com/videos";

function getHeaders(): HeadersInit {
  const apiKey = process.env.PEXELS_API_KEY;
  if (!apiKey) {
    throw new Error("PEXELS_API_KEY environment variable is not set");
  }
  return { Authorization: apiKey };
}

async function pexelsFetch<T>(url: string): Promise<T> {
  const res = await fetch(url, { headers: getHeaders() });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Pexels API error ${res.status}: ${text}`);
  }
  return res.json();
}

/** Photos **/

export async function searchPhotos(
  query: string,
  page: number = 1,
  perPage: number = 30
) {
  const url = `${PEXELS_API_BASE}/search?query=${encodeURIComponent(query)}&per_page=${perPage}&page=${page}`;
  return pexelsFetch<import("@/types/pexels").PexelsPhotosResponse>(url);
}

export async function getCuratedPhotos(page: number = 1, perPage: number = 30) {
  const url = `${PEXELS_API_BASE}/curated?per_page=${perPage}&page=${page}`;
  return pexelsFetch<import("@/types/pexels").PexelsPhotosResponse>(url);
}

export async function getPhotoDetail(id: number) {
  const url = `${PEXELS_API_BASE}/photos/${id}`;
  return pexelsFetch<import("@/types/pexels").PexelsPhoto>(url);
}

/** Videos **/

export async function searchVideos(
  query: string,
  page: number = 1,
  perPage: number = 30
) {
  const url = `${PEXELS_VIDEOS_API_BASE}/search?query=${encodeURIComponent(query)}&per_page=${perPage}&page=${page}`;
  return pexelsFetch<import("@/types/pexels").PexelsVideosResponse>(url);
}

export async function getPopularVideos(
  page: number = 1,
  perPage: number = 30
) {
  const url = `${PEXELS_VIDEOS_API_BASE}/popular?per_page=${perPage}&page=${page}`;
  return pexelsFetch<import("@/types/pexels").PexelsVideosResponse>(url);
}

export async function getVideoDetail(id: number) {
  const url = `${PEXELS_VIDEOS_API_BASE}/videos/${id}`;
  return pexelsFetch<import("@/types/pexels").PexelsVideo>(url);
}

/** Collections **/

export async function getFeaturedCollections(
  page: number = 1,
  perPage: number = 30
) {
  const url = `${PEXELS_API_BASE}/collections/featured?per_page=${perPage}&page=${page}`;
  return pexelsFetch<import("@/types/pexels").PexelsCollectionsResponse>(url);
}

export async function getCollectionMedia(
  id: string,
  page: number = 1,
  perPage: number = 30
) {
  const url = `${PEXELS_API_BASE}/collections/${id}?per_page=${perPage}&page=${page}&type=photos,videos`;
  return pexelsFetch<import("@/types/pexels").PexelsCollectionDetailResponse>(
    url
  );
}
