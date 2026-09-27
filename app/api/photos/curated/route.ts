import { NextRequest } from "next/server";
import { getCuratedPhotos } from "@/lib/pexels";
import { errorResponse, parsePagination } from "@/lib/api-utils";

export async function GET(request: NextRequest) {
  const { page, perPage } = parsePagination(request.nextUrl.searchParams);

  try {
    const data = await getCuratedPhotos(page, perPage);
    return Response.json(data);
  } catch (error) {
    return errorResponse(error);
  }
}
