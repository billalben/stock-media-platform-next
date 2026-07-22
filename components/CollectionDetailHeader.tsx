"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Sun, Moon } from "lucide-react";
import { useTheme } from "@/context/ThemeProvider";

export default function CollectionDetailHeader({
  title,
}: {
  title?: string;
}) {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="fixed top-0 right-0 left-0 z-20 flex items-center h-16 px-1 gap-2 bg-surface">
      <button
        className="icon-btn"
        onClick={() => router.back()}
        aria-label="Go back"
      >
        <ArrowLeft size={24} />
      </button>

      <Link
        href="/"
        className="text-[2.6rem] font-medium text-primary tracking-[-0.5px] leading-7"
      >
        Pixstock
      </Link>

      <h1 className="flex-1 ml-4 text-title-large truncate">
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
