import type { Metadata } from "next";
import { Suspense } from "react";
import CollectionGallery from "@/components/CollectionGallery";

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
        <h1 className="text-title-large md:text-headline-small xl:text-headline-medium mb-4 capitalize">
          Collections
        </h1>

        <Suspense
          fallback={
            <div className="md:grid md:grid-cols-2 xl:grid-cols-3 xl:gap-x-6">
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between h-18 px-4 border-b border-outline-variant"
                >
                  <div className="space-y-1">
                    <div className="w-48 h-4 bg-surface-container-highest rounded animate-skeleton" />
                    <div className="w-24 h-3 bg-surface-container-highest rounded animate-skeleton" />
                  </div>
                </div>
              ))}
            </div>
          }
        >
          <CollectionGallery key={query} />
        </Suspense>
      </div>
    </main>
  );
}
