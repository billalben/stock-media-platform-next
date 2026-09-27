"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Sun, Moon } from "lucide-react";
import { useTheme } from "@/context/ThemeProvider";
import DownloadMenu from "./DownloadMenu";
import FavoriteButton from "./FavoriteButton";
import type { PexelsPhoto, PexelsVideo } from "@/types/pexels";

interface DetailHeaderProps {
  downloads: { label: string; url: string }[];
  favoriteType: "photos" | "videos";
  favoriteId: number;
  favoriteData?: PexelsPhoto | PexelsVideo;
}

export default function DetailHeader({
  downloads,
  favoriteType,
  favoriteId,
  favoriteData,
}: DetailHeaderProps) {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="fixed top-0 right-0 left-0 z-20 flex h-16 items-center gap-1 bg-surface px-1">
      <button
        className="icon-btn"
        onClick={() => router.back()}
        aria-label="Go back"
      >
        <ArrowLeft size={24} />
      </button>

      <Link
        href="/"
        className="text-[2.6rem] leading-7 font-medium tracking-[-0.5px] text-primary"
      >
        Pixstock
      </Link>

      <div className="flex flex-1 items-center justify-end gap-1">
        <DownloadMenu downloads={downloads} />
        <FavoriteButton
          type={favoriteType}
          id={favoriteId}
          data={favoriteData}
        />
        <button
          className="icon-btn theme-btn"
          onClick={toggleTheme}
          aria-label="Switch theme"
        >
          {theme === "dark" ? <Sun size={24} /> : <Moon size={24} />}
        </button>
      </div>
    </header>
  );
}
