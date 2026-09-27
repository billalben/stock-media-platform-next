import { NextRequest } from "next/server";
import { getCollectionMedia } from "@/lib/pexels";
import { errorResponse, parsePagination } from "@/lib/api-utils";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { page, perPage } = parsePagination(request.nextUrl.searchParams);

  if (!id) {
    return Response.json(
      { error: "Collection ID is required" },
      { status: 400 }
    );
  }

  try {
    const data = await getCollectionMedia(id, page, perPage);
    return Response.json(data);
  } catch (error) {
    return errorResponse(error);
  }
}
