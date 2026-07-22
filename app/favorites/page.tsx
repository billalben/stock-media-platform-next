import type { Metadata } from "next";
import { Suspense } from "react";
import FavoritesContent from "@/components/FavoritesContent";

export const metadata: Metadata = {
  title: "Favorites - Pixstock",
  description: "Your saved favorite photos and videos.",
};

export default function FavoritesPage() {
  return (
    <main className="flex-1 pt-3">
      <div className="container">
        <h1 className="text-title-large md:text-headline-small xl:text-headline-medium mb-4 capitalize">
          Favorite
        </h1>

        <Suspense fallback={null}>
          <FavoritesContent />
        </Suspense>
      </div>
    </main>
  );
}
