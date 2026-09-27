import Link from "next/link";
import type { PexelsCollection } from "@/types/pexels";

interface CollectionCardProps {
  collection: PexelsCollection;
}

export default function CollectionCard({ collection }: CollectionCardProps) {
  const { id, title, media_count } = collection;

  return (
    <div className="group relative flex h-18 items-center justify-between border-b border-outline-variant px-4">
      <div>
        <h3 className="max-w-60 truncate text-body-large text-on-surface">
          {title}
        </h3>
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
