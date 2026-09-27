import GallerySkeleton from "@/components/GallerySkeleton";

export default function Loading() {
  return (
    <main className="flex-1 pt-16">
      <div className="container xl:grid xl:max-w-360 xl:grid-cols-[1fr_minmax(0,1fr)] xl:items-start xl:gap-6">
        <div className="detail-wrapper grid h-147 grid-rows-[1fr_max-content] place-items-center xl:sticky xl:top-19 xl:h-197">
          <div className="mx-auto mb-2 h-100 w-full animate-skeleton rounded-2xl bg-surface-container-highest xl:h-140" />
          <div className="h-4 w-48 animate-skeleton rounded bg-surface-container-highest" />
        </div>

        <div>
          <div className="mt-8 mb-4 h-8 w-2/3 animate-skeleton rounded bg-surface-container-highest xl:mt-10" />
          <GallerySkeleton count={9} />
        </div>
      </div>
    </main>
  );
}
