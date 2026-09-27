import { NextRequest } from "next/server";
import { getPopularVideos } from "@/lib/pexels";
import { errorResponse, parsePagination } from "@/lib/api-utils";

export async function GET(request: NextRequest) {
  const { page, perPage } = parsePagination(request.nextUrl.searchParams);

  try {
    const data = await getPopularVideos(page, perPage);
    return Response.json(data);
  } catch (error) {
    return errorResponse(error);
  }
}
