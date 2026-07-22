import Link from "next/link";

export default function BannerSection() {
  return (
    <section
      className="flex gap-4 px-4 pb-[18px] mb-6 overflow-x-auto snap-x snap-mandatory scroll-px-4"
      aria-label="Banner"
    >
      {/* Photos Banner */}
      <div className="banner-card primary shrink-0 w-full h-[360px] md:h-[420px] xl:h-[560px] rounded-3xl relative flex items-end overflow-hidden snap-start z-[1] bg-primary-container text-on-primary-container">
        <div className="absolute inset-0 z-[-1] grid gap-3 grid-cols-8 grid-rows-5 -top-4 -left-4 -right-4 bottom-[28%] md:bottom-[-16px] md:left-[32%] md:top-[-16px] md:right-[-16px]">
          <div
            className="rounded-2xl bg-on-primary-container bg-cover bg-center"
            style={{
              gridArea: "b1",
              backgroundImage: "url(/assets/images/photo-banner-1.jpg)",
            }}
          />
          <div
            className="rounded-2xl bg-on-primary-container bg-cover bg-center"
            style={{
              gridArea: "b2",
              backgroundImage: "url(/assets/images/photo-banner-2.jpg)",
            }}
          />
          <div
            className="rounded-2xl bg-on-primary-container bg-cover bg-center"
            style={{
              gridArea: "b3",
              backgroundImage: "url(/assets/images/photo-banner-3.jpg)",
            }}
          />
          <div
            className="rounded-2xl bg-on-primary-container bg-cover bg-center"
            style={{
              gridArea: "b4",
              backgroundImage: "url(/assets/images/photo-banner-4.jpg)",
            }}
          />
          <div
            className="rounded-2xl bg-on-primary-container bg-cover bg-center"
            style={{
              gridArea: "b5",
              backgroundImage: "url(/assets/images/photo-banner-5.jpg)",
            }}
          />
          <div
            className="rounded-2xl bg-on-primary-container bg-cover bg-center"
            style={{
              gridArea: "b6",
              backgroundImage: "url(/assets/images/photo-banner-6.jpg)",
            }}
          />
        </div>

        <div className="w-full h-full grid content-end md:content-center gap-3 p-6 md:p-8 xl:p-[84px] bg-gradient-to-t md:bg-gradient-to-l from-primary-container to-transparent">
          <h3 className="text-headline-medium md:text-display-small xl:text-display-large max-w-[16ch]">
            High quality stock photos for free!
          </h3>
          <p className="text-body-large hidden md:block md:max-w-[40%]">
            Explore our exceptional collection of high-quality stock photos.
          </p>
          <Link
            href="/photos"
            className="btn-primary h-10 px-6 rounded-full flex items-center gap-2 text-label-large max-w-max"
          >
            Explore Now
          </Link>
        </div>
      </div>

      {/* Videos Banner */}
      <div className="banner-card secondary shrink-0 w-full h-[360px] md:h-[420px] xl:h-[560px] rounded-3xl relative flex items-end overflow-hidden snap-start z-[1] bg-secondary-container text-on-secondary-container">
        <div className="absolute inset-0 z-[-1] grid gap-3 grid-cols-8 grid-rows-5 -top-4 -left-4 -right-4 bottom-[28%] md:bottom-[-16px] md:left-[32%] md:top-[-16px] md:right-[-16px]">
          {["1", "2", "3", "4", "5", "6"].map((n) => (
            <div key={n} className="rounded-2xl overflow-hidden bg-on-secondary-container" style={{ gridArea: `b${n}` }}>
              <video
                className="w-full h-full object-cover scale-105"
                autoPlay
                muted
                loop
                playsInline
              >
                <source
                  src={`/assets/videos/video-banner-${n}.mp4`}
                  type="video/mp4"
                />
              </video>
            </div>
          ))}
        </div>

        <div className="w-full h-full grid content-end md:content-center gap-3 p-6 md:p-8 xl:p-[84px] bg-gradient-to-t md:bg-gradient-to-l from-secondary-container to-transparent">
          <h3 className="text-headline-medium md:text-display-small xl:text-display-large max-w-[16ch]">
            Top rated stock Videos for free!
          </h3>
          <p className="text-body-large hidden md:block md:max-w-[40%]">
            Our curated selection videos is sure to inspire and captivate.
          </p>
          <Link
            href="/videos"
            className="btn-secondary h-10 px-6 rounded-full flex items-center gap-2 text-label-large max-w-max bg-secondary text-on-secondary"
          >
            Explore Now
          </Link>
        </div>
      </div>

      {/* Collections Banner */}
      <div className="banner-card tertiary shrink-0 w-full h-[360px] md:h-[420px] xl:h-[560px] rounded-3xl relative flex items-end overflow-hidden snap-start z-[1] bg-tertiary-container text-on-tertiary-container">
        <div className="absolute inset-0 z-[-1] grid gap-3 grid-cols-8 grid-rows-5 -top-4 -left-4 -right-4 bottom-[28%] md:bottom-[-16px] md:left-[32%] md:top-[-16px] md:right-[-16px]">
          <div
            className="rounded-2xl bg-on-tertiary-container bg-cover bg-center"
            style={{
              gridArea: "b1",
              backgroundImage: "url(/assets/images/collection-banner-1.jpg)",
            }}
          />
          <div className="rounded-2xl overflow-hidden bg-on-tertiary-container" style={{ gridArea: "b2" }}>
            <video
              className="w-full h-full object-cover scale-105"
              autoPlay
              muted
              loop
              playsInline
            >
              <source src="/assets/videos/collection-banner-2.mp4" type="video/mp4" />
            </video>
          </div>
          <div
            className="rounded-2xl bg-on-tertiary-container bg-cover bg-center"
            style={{
              gridArea: "b3",
              backgroundImage: "url(/assets/images/collection-banner-3.jpg)",
            }}
          />
          <div
            className="rounded-2xl bg-on-tertiary-container bg-cover bg-center"
            style={{
              gridArea: "b4",
              backgroundImage: "url(/assets/images/collection-banner-4.jpg)",
            }}
          />
          <div className="rounded-2xl overflow-hidden bg-on-tertiary-container" style={{ gridArea: "b5" }}>
            <video
              className="w-full h-full object-cover scale-105"
              autoPlay
              muted
              loop
              playsInline
            >
              <source src="/assets/videos/collection-banner-5.mp4" type="video/mp4" />
            </video>
          </div>
          <div className="rounded-2xl overflow-hidden bg-on-tertiary-container" style={{ gridArea: "b6" }}>
            <video
              className="w-full h-full object-cover scale-105"
              autoPlay
              muted
              loop
              playsInline
            >
              <source src="/assets/videos/collection-banner-6.mp4" type="video/mp4" />
            </video>
          </div>
        </div>

        <div className="w-full h-full grid content-end md:content-center gap-3 p-6 md:p-8 xl:p-[84px] bg-gradient-to-t md:bg-gradient-to-l from-tertiary-container to-transparent">
          <h3 className="text-headline-medium md:text-display-small xl:text-display-large max-w-[16ch]">
            Best collections with best medias!
          </h3>
          <p className="text-body-large hidden md:block md:max-w-[40%]">
            Discover a treasure trove of stunning images, captivating videos.
          </p>
          <Link
            href="/collections"
            className="btn-tertiary h-10 px-6 rounded-full flex items-center gap-2 text-label-large max-w-max bg-tertiary text-on-tertiary"
          >
            Explore Now
          </Link>
        </div>
      </div>
    </section>
  );
}
