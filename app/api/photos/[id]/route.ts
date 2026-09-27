import { NextRequest } from "next/server";
import { getPhotoDetail } from "@/lib/pexels";
import { errorResponse } from "@/lib/api-utils";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const photoId = Number(id);

  if (!Number.isInteger(photoId) || photoId <= 0) {
    return Response.json({ error: "Invalid photo ID" }, { status: 400 });
  }

  try {
    const data = await getPhotoDetail(photoId);
    return Response.json(data);
  } catch (error) {
    return errorResponse(error);
  }
}
