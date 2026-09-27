import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Pixstock - A large stock library",
    short_name: "Pixstock",
    description:
      "Explore our exceptional collection of high-quality stock photos and videos powered by Pexels.",
    start_url: "/",
    display: "standalone",
    background_color: "#fafdfc",
    theme_color: "#006a67",
    icons: [
      {
        src: "/favicon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
