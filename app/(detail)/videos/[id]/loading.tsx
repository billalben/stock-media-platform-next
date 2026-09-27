export default function Loading() {
  return (
    <main className="flex-1 pt-16">
      <div className="container xl:max-w-360 xl:grid xl:grid-cols-[1fr_minmax(0,1fr)] xl:items-start xl:gap-6">
        <div className="detail-wrapper h-147 xl:h-197 grid grid-rows-[1fr_max-content] place-items-center xl:sticky xl:top-19">
          <div className="w-full h-100 xl:h-140 mx-auto bg-surface-container-highest rounded-2xl animate-skeleton mb-2" />
          <div className="w-48 h-4 bg-surface-container-highest rounded animate-skeleton" />
        </div>

        <div>
          <div className="w-2/3 h-8 bg-surface-container-highest rounded animate-skeleton xl:mt-10 mt-8 mb-4" />
          <div className="space-y-2">
            <div className="w-40 h-4 bg-surface-container-highest rounded animate-skeleton" />
            <div className="w-40 h-4 bg-surface-container-highest rounded animate-skeleton" />
          </div>
        </div>
      </div>
    </main>
  );
}
