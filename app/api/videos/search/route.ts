import { NextRequest } from "next/server";
import { searchVideos } from "@/lib/pexels";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const query = searchParams.get("query");
  const page = Number(searchParams.get("page")) || 1;
  const perPage = Number(searchParams.get("per_page")) || 30;
  const orientation = searchParams.get("orientation") || undefined;
  const size = searchParams.get("size") || undefined;

  if (!query) {
    return Response.json({ error: "Query parameter is required" }, { status: 400 });
  }

  try {
    const data = await searchVideos(query, page, perPage, orientation, size);
    return Response.json(data);
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 }
    );
  }
}
