import { NextRequest } from "next/server";
import { getVideoDetail } from "@/lib/pexels";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const videoId = Number(id);

  if (!videoId) {
    return Response.json({ error: "Invalid video ID" }, { status: 400 });
  }

  try {
    const data = await getVideoDetail(videoId);
    return Response.json(data);
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 }
    );
  }
}
