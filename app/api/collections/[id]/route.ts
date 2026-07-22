import { NextRequest } from "next/server";
import { getCollectionMedia } from "@/lib/pexels";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { searchParams } = request.nextUrl;
  const page = Number(searchParams.get("page")) || 1;
  const perPage = Number(searchParams.get("per_page")) || 30;

  if (!id) {
    return Response.json({ error: "Collection ID is required" }, { status: 400 });
  }

  try {
    const data = await getCollectionMedia(id, page, perPage);
    return Response.json(data);
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 }
    );
  }
}
