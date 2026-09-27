import { ImageResponse } from "next/og";
import { getPhotoDetail } from "@/lib/pexels";

export const alt = "Pixstock photo";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let title = "Stock photo";
  let subtitle = "Discover more on Pixstock";

  try {
    const photo = await getPhotoDetail(Number(id));
    title = photo.alt || "Stock photo";
    subtitle = `Photo by ${photo.photographer}`;
  } catch {
    /* fall back to defaults */
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "linear-gradient(135deg, #006a67 0%, #003735 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 40, opacity: 0.85 }}>Pixstock</div>
        <div
          style={{
            fontSize: 68,
            fontWeight: 700,
            lineHeight: 1.1,
            maxHeight: 340,
            overflow: "hidden",
          }}
        >
          {title}
        </div>
        <div style={{ fontSize: 32, opacity: 0.85 }}>{subtitle}</div>
      </div>
    ),
    { ...size }
  );
}
