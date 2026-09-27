import { PexelsError } from "@/lib/pexels";

const MAX_PER_PAGE = 80;
const DEFAULT_PER_PAGE = 30;

function clampInt(
  raw: string | null,
  { min, max, fallback }: { min: number; max: number; fallback: number },
): number {
  const value = Number(raw);
  if (!Number.isFinite(value)) return fallback;
  const int = Math.trunc(value);
  return Math.min(Math.max(int, min), max);
}

export function parsePagination(searchParams: URLSearchParams): {
  page: number;
  perPage: number;
} {
  return {
    page: clampInt(searchParams.get("page"), {
      min: 1,
      max: Number.MAX_SAFE_INTEGER,
      fallback: 1,
    }),
    perPage: clampInt(searchParams.get("per_page"), {
      min: 1,
      max: MAX_PER_PAGE,
      fallback: DEFAULT_PER_PAGE,
    }),
  };
}

export function errorResponse(error: unknown): Response {
  if (error instanceof PexelsError) {
    const init: ResponseInit = { status: error.status };
    if (error.status === 429 && error.retryAfter !== undefined) {
      init.headers = {
        "Retry-After": String(Math.ceil(error.retryAfter / 1000)),
      };
    }
    return Response.json({ error: error.message }, init);
  }

  return Response.json(
    { error: error instanceof Error ? error.message : "Internal server error" },
    { status: 500 },
  );
}
