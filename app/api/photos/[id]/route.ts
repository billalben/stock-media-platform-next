import { NextRequest } from "next/server";
import { getPhotoDetail } from "@/lib/pexels";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const photoId = Number(id);

  if (!photoId) {
    return Response.json({ error: "Invalid photo ID" }, { status: 400 });
  }

  try {
    const data = await getPhotoDetail(photoId);
    return Response.json(data);
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 }
    );
  }
}
