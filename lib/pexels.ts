import { cache } from "react";
import type {
  PexelsCollectionDetailResponse,
  PexelsCollectionsResponse,
  PexelsPhoto,
  PexelsPhotosResponse,
  PexelsVideo,
  PexelsVideosResponse,
} from "@/types/pexels";

const PEXELS_API_BASE = "https://api.pexels.com/v1";
const PEXELS_VIDEOS_API_BASE = "https://api.pexels.com/videos";

const REQUEST_TIMEOUT_MS = 10_000;
const MAX_ATTEMPTS = 3;
const BASE_BACKOFF_MS = 300;
const MAX_RETRY_AFTER_MS = 10_000;

export class PexelsError extends Error {
  status: number;
  retryAfter?: number;

  constructor(message: string, status: number, retryAfter?: number) {
    super(message);
    this.name = "PexelsError";
    this.status = status;
    this.retryAfter = retryAfter;
  }
}

interface FetchConfig {
  revalidate: number;
  tags: string[];
}

function getHeaders(): HeadersInit {
  const apiKey = process.env.PEXELS_API_KEY;
  if (!apiKey) {
    throw new Error("PEXELS_API_KEY environment variable is not set");
  }
  return { Authorization: apiKey };
}

function parseRetryAfter(header: string | null): number | undefined {
  if (!header) return undefined;

  const seconds = Number(header);
  if (Number.isFinite(seconds)) {
    return Math.max(0, seconds * 1000);
  }

  const date = Date.parse(header);
  if (!Number.isNaN(date)) {
    return Math.max(0, date - Date.now());
  }

  return undefined;
}

function isRetryableStatus(status: number): boolean {
  return status === 429 || status >= 500;
}

function backoffDelay(attempt: number): number {
  return BASE_BACKOFF_MS * 2 ** attempt + Math.random() * 100;
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function pexelsFetch<T>(url: string, config: FetchConfig): Promise<T> {
  const headers = getHeaders();

  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
    const isLastAttempt = attempt === MAX_ATTEMPTS - 1;

    try {
      const res = await fetch(url, {
        headers,
        signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
        next: { revalidate: config.revalidate, tags: config.tags },
      });

      if (res.ok) {
        return (await res.json()) as T;
      }

      const text = await res.text();
      const retryAfter = parseRetryAfter(res.headers.get("retry-after"));

      if (!isRetryableStatus(res.status) || isLastAttempt) {
        throw new PexelsError(
          `Pexels API error ${res.status}: ${text}`,
          res.status,
          retryAfter,
        );
      }

      const wait =
        retryAfter !== undefined
          ? Math.min(retryAfter, MAX_RETRY_AFTER_MS)
          : backoffDelay(attempt);
      await sleep(wait);
    } catch (error) {
      if (error instanceof PexelsError) {
        throw error;
      }

      if (isLastAttempt) {
        const timedOut =
          error instanceof Error &&
          (error.name === "TimeoutError" || error.name === "AbortError");
        throw new PexelsError(
          timedOut
            ? "Pexels API request timed out"
            : "Failed to reach the Pexels API",
          timedOut ? 504 : 502,
        );
      }

      await sleep(backoffDelay(attempt));
    }
  }

  throw new PexelsError("Pexels API request failed", 500);
}

/** Photos **/

export const searchPhotos = cache(
  async (
    query: string,
    page: number = 1,
    perPage: number = 30,
    orientation?: string,
    size?: string,
    color?: string,
  ) => {
    const params = new URLSearchParams();
    params.set("query", query);
    params.set("page", String(page));
    params.set("per_page", String(perPage));
    if (orientation) params.set("orientation", orientation);
    if (size) params.set("size", size);
    if (color) params.set("color", color);

    const url = `${PEXELS_API_BASE}/search?${params}`;
    return pexelsFetch<PexelsPhotosResponse>(url, {
      revalidate: 60,
      tags: ["search-photos"],
    });
  },
);

export const getCuratedPhotos = cache(
  async (page: number = 1, perPage: number = 30) => {
    const url = `${PEXELS_API_BASE}/curated?per_page=${perPage}&page=${page}`;
    return pexelsFetch<PexelsPhotosResponse>(url, {
      revalidate: 300,
      tags: ["photos"],
    });
  },
);

export const getPhotoDetail = cache(async (id: number) => {
  const url = `${PEXELS_API_BASE}/photos/${id}`;
  return pexelsFetch<PexelsPhoto>(url, {
    revalidate: 86400,
    tags: [`photo-${id}`],
  });
});

/** Videos **/

export const searchVideos = cache(
  async (
    query: string,
    page: number = 1,
    perPage: number = 30,
    orientation?: string,
    size?: string,
  ) => {
    const params = new URLSearchParams();
    params.set("query", query);
    params.set("page", String(page));
    params.set("per_page", String(perPage));
    if (orientation) params.set("orientation", orientation);
    if (size) params.set("size", size);
    const url = `${PEXELS_VIDEOS_API_BASE}/search?${params}`;
    return pexelsFetch<PexelsVideosResponse>(url, {
      revalidate: 60,
      tags: ["search-videos"],
    });
  },
);

export const getPopularVideos = cache(
  async (page: number = 1, perPage: number = 30) => {
    const url = `${PEXELS_VIDEOS_API_BASE}/popular?per_page=${perPage}&page=${page}`;
    return pexelsFetch<PexelsVideosResponse>(url, {
      revalidate: 300,
      tags: ["videos"],
    });
  },
);

export const getVideoDetail = cache(async (id: number) => {
  const url = `${PEXELS_VIDEOS_API_BASE}/videos/${id}`;
  return pexelsFetch<PexelsVideo>(url, {
    revalidate: 86400,
    tags: [`video-${id}`],
  });
});

/** Collections **/

export const getFeaturedCollections = cache(
  async (page: number = 1, perPage: number = 30) => {
    const url = `${PEXELS_API_BASE}/collections/featured?per_page=${perPage}&page=${page}`;
    return pexelsFetch<PexelsCollectionsResponse>(url, {
      revalidate: 300,
      tags: ["collections"],
    });
  },
);

export const getCollectionMedia = cache(
  async (id: string, page: number = 1, perPage: number = 30) => {
    const url = `${PEXELS_API_BASE}/collections/${id}?per_page=${perPage}&page=${page}&type=photos,videos`;
    return pexelsFetch<PexelsCollectionDetailResponse>(url, {
      revalidate: 300,
      tags: [`collection-${id}`],
    });
  },
);
