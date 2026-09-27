"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Sun, Moon } from "lucide-react";
import { useTheme } from "@/context/ThemeProvider";

export default function CollectionDetailHeader({ title }: { title?: string }) {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="fixed top-0 right-0 left-0 z-20 flex h-16 items-center gap-2 bg-surface px-1">
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

      <h1 className="ml-4 flex-1 truncate text-title-large">
        {title || "Collection"}
      </h1>

      <button
        className="icon-btn theme-btn"
        onClick={toggleTheme}
        aria-label="Switch theme"
      >
        {theme === "dark" ? <Sun size={24} /> : <Moon size={24} />}
      </button>
    </header>
  );
}
