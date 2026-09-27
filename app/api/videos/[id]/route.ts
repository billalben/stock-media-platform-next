import { NextRequest } from "next/server";
import { getVideoDetail } from "@/lib/pexels";
import { errorResponse } from "@/lib/api-utils";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const videoId = Number(id);

  if (!Number.isInteger(videoId) || videoId <= 0) {
    return Response.json({ error: "Invalid video ID" }, { status: 400 });
  }

  try {
    const data = await getVideoDetail(videoId);
    return Response.json(data);
  } catch (error) {
    return errorResponse(error);
  }
}
