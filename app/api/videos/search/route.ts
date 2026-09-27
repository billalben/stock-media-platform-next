import { NextRequest } from "next/server";
import { searchVideos } from "@/lib/pexels";
import { errorResponse, parsePagination } from "@/lib/api-utils";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const query = searchParams.get("query");
  const { page, perPage } = parsePagination(searchParams);
  const orientation = searchParams.get("orientation") || undefined;
  const size = searchParams.get("size") || undefined;

  if (!query) {
    return Response.json(
      { error: "Query parameter is required" },
      { status: 400 }
    );
  }

  try {
    const data = await searchVideos(query, page, perPage, orientation, size);
    return Response.json(data);
  } catch (error) {
    return errorResponse(error);
  }
}
