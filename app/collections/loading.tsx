import CollectionListSkeleton from "@/components/CollectionListSkeleton";

export default function Loading() {
  return (
    <main className="flex-1 pt-3">
      <div className="container">
        <h1 className="mb-4 text-title-large capitalize md:text-headline-small xl:text-headline-medium">
          Collections
        </h1>
        <CollectionListSkeleton />
      </div>
    </main>
  );
}
