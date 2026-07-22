import type React from "react";
import Link from "next/link";

type BannerVariant = "primary" | "secondary" | "tertiary";

function BannerGridItem({
  type,
  src,
  area,
}: {
  type: "image" | "video";
  src: string;
  area: string;
}) {
  if (type === "video") {
    return (
      <div className="banner-grid-item" style={{ gridArea: area }}>
        <video autoPlay muted loop playsInline {...({ loading: "lazy" } as React.VideoHTMLAttributes<HTMLVideoElement>)}>
          <source src={src} type="video/mp4" />
        </video>
      </div>
    );
  }
  return (
    <div
      className="banner-grid-item"
      style={{ gridArea: area, backgroundImage: `url(${src})` }}
    />
  );
}

function BannerGrid({
  items,
}: {
  items: { type: "image" | "video"; src: string }[];
}) {
  return (
    <div className="banner-grid">
      {items.map((item, i) => (
        <BannerGridItem
          key={i}
          type={item.type}
          src={item.src}
          area={`b${i + 1}`}
        />
      ))}
    </div>
  );
}

export default function BannerSection() {
  return (
    <section className="banner" aria-label="Banner">
      {/* Primary: Photos */}
      <BannerCard
        variant="primary"
        title="High quality stock photos for free!"
        description="Explore our exceptional collection of high-quality stock photos."
        href="/photos"
      >
        <BannerGrid
          items={[
            { type: "image", src: "/assets/images/photo-banner-1.jpg" },
            { type: "image", src: "/assets/images/photo-banner-2.jpg" },
            { type: "image", src: "/assets/images/photo-banner-3.jpg" },
            { type: "image", src: "/assets/images/photo-banner-4.jpg" },
            { type: "image", src: "/assets/images/photo-banner-5.jpg" },
            { type: "image", src: "/assets/images/photo-banner-6.jpg" },
          ]}
        />
      </BannerCard>

      {/* Secondary: Videos */}
      <BannerCard
        variant="secondary"
        title="Top rated stock Videos for free!"
        description="Our curated selection videos is sure to inspire and captivate."
        href="/videos"
      >
        <BannerGrid
          items={[
            { type: "video", src: "/assets/videos/video-banner-1.mp4" },
            { type: "video", src: "/assets/videos/video-banner-2.mp4" },
            { type: "video", src: "/assets/videos/video-banner-3.mp4" },
            { type: "video", src: "/assets/videos/video-banner-4.mp4" },
            { type: "video", src: "/assets/videos/video-banner-5.mp4" },
            { type: "video", src: "/assets/videos/video-banner-6.mp4" },
          ]}
        />
      </BannerCard>

      {/* Tertiary: Collections (mixed) */}
      <BannerCard
        variant="tertiary"
        title="Best collections with best medias!"
        description="Discover a treasure trove of stunning images, captivating videos."
        href="/collections"
      >
        <BannerGrid
          items={[
            { type: "image", src: "/assets/images/collection-banner-1.jpg" },
            { type: "video", src: "/assets/videos/collection-banner-2.mp4" },
            { type: "image", src: "/assets/images/collection-banner-3.jpg" },
            { type: "image", src: "/assets/images/collection-banner-4.jpg" },
            { type: "video", src: "/assets/videos/collection-banner-5.mp4" },
            { type: "video", src: "/assets/videos/collection-banner-6.mp4" },
          ]}
        />
      </BannerCard>
    </section>
  );
}

function BannerCard({
  variant,
  title,
  description,
  href,
  children,
}: {
  variant: BannerVariant;
  title: string;
  description: string;
  href: string;
  children: React.ReactNode;
}) {
  const btnClass =
    variant === "primary"
      ? "btn-primary"
      : variant === "secondary"
        ? "btn-secondary"
        : "btn-tertiary";

  return (
    <div className={`banner-card ${variant}`}>
      {children}

      <div className="banner-content">
        <h3 className="banner-title">{title}</h3>
        <p className="banner-text">{description}</p>
        <Link
          href={href}
          className={`${btnClass} h-10 px-6 rounded-full flex items-center gap-2 max-w-max`}
        >
          <span className="text-label-large font-normal">Explore Now</span>
        </Link>
      </div>
    </div>
  );
}
