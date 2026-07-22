export interface PexelsPhoto {
  id: number;
  width: number;
  height: number;
  url: string;
  photographer: string;
  photographer_url: string;
  photographer_id: number;
  avg_color: string;
  src: {
    original: string;
    large2x: string;
    large: string;
    medium: string;
    small: string;
    portrait: string;
    landscape: string;
    tiny: string;
  };
  liked: boolean;
  alt: string;
}

export interface PexelsPhotosResponse {
  page: number;
  per_page: number;
  photos: PexelsPhoto[];
  total_results: number;
  next_page: string;
}

export interface PexelsVideoFile {
  id: number;
  quality: "hd" | "sd" | "hls" | "uhd";
  file_type: string;
  width: number;
  height: number;
  fps: number;
  link: string;
}

export interface PexelsVideoPicture {
  id: number;
  picture: string;
  nr: number;
}

export interface PexelsVideo {
  id: number;
  width: number;
  height: number;
  url: string;
  image: string;
  duration: number;
  user: {
    id: number;
    name: string;
    url: string;
  };
  video_files: PexelsVideoFile[];
  video_pictures: PexelsVideoPicture[];
}

export interface PexelsVideosResponse {
  page: number;
  per_page: number;
  videos: PexelsVideo[];
  total_results: number;
  next_page: string;
  url?: string;
}

export interface PexelsCollection {
  id: string;
  title: string;
  description: string;
  private: boolean;
  media_count: number;
  photos_count: number;
  videos_count: number;
}

export interface PexelsCollectionsResponse {
  page: number;
  per_page: number;
  collections: PexelsCollection[];
  total_results: number;
  next_page: string;
}

export type CollectionMediaItem =
  | (PexelsPhoto & { type: "Photo" })
  | (PexelsVideo & { type: "Video" });

export interface PexelsCollectionDetailResponse {
  id: string;
  page: number;
  per_page: number;
  media: CollectionMediaItem[];
  total_results: number;
  next_page: string;
}
