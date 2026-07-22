import Link from "next/link";
import type { PexelsCollection } from "@/types/pexels";

interface CollectionCardProps {
  collection: PexelsCollection;
}

export default function CollectionCard({ collection }: CollectionCardProps) {
  const { id, title, media_count } = collection;

  return (
    <div className="relative flex items-center justify-between h-[72px] px-4 border-b border-outline-variant group">
      <div>
        <h3 className="text-body-large text-on-surface truncate max-w-[240px]">{title}</h3>
        <p className="text-body-medium text-on-surface-variant">
          {media_count} media
        </p>
      </div>

      <Link
        href={`/collections/${id}?title=${encodeURIComponent(title)}`}
        className="absolute inset-0"
        aria-label={title}
      />
    </div>
  );
}
