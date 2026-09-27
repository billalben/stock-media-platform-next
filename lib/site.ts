const FALLBACK_SITE_URL = "https://stockmedia.billalbenz.com";

function normalizeSiteUrl(value: string | undefined): string {
  const raw = value?.trim();
  if (!raw) return FALLBACK_SITE_URL;
  if (/^https?:\/\//i.test(raw)) return raw;

  const isLocal = /^(localhost|127\.0\.0\.1|\[::1\])(:\d+)?$/i.test(raw);
  return `${isLocal ? "http" : "https"}://${raw}`;
}

export const SITE_URL = normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL);
