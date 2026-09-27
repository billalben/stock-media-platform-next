import CollectionListSkeleton from "@/components/CollectionListSkeleton";

export default function Loading() {
  return (
    <main className="flex-1 pt-3">
      <div className="container">
        <h1 className="text-title-large md:text-headline-small xl:text-headline-medium mb-4 capitalize">
          Collections
        </h1>
        <CollectionListSkeleton />
      </div>
    </main>
  );
}
