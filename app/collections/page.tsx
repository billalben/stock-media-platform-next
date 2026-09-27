import type { Metadata } from "next";
import { Suspense } from "react";
import CollectionGallery from "@/components/CollectionGallery";
import CollectionListSkeleton from "@/components/CollectionListSkeleton";

export const metadata: Metadata = {
  title: "Collections - Pixstock",
  description: "Browse featured collections of stock photos and videos.",
};

interface CollectionsPageProps {
  searchParams: Promise<{ query?: string }>;
}

export default async function CollectionsPage({
  searchParams,
}: CollectionsPageProps) {
  const { query = "" } = await searchParams;

  return (
    <main className="flex-1 pt-3">
      <div className="container">
        <h1 className="mb-4 text-title-large capitalize md:text-headline-small xl:text-headline-medium">
          Collections
        </h1>

        <Suspense fallback={<CollectionListSkeleton />}>
          <CollectionGallery key={query} />
        </Suspense>
      </div>
    </main>
  );
}
