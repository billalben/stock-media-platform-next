"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Image,
  Video,
  Grid3X3,
  Heart,
  ArrowLeft,
  Menu,
  Sun,
  Moon,
} from "lucide-react";
import { useTheme } from "@/context/ThemeProvider";
import SearchBar from "./SearchBar";

const NAV_ITEMS = [
  { href: "/", label: "Home", Icon: Home },
  { href: "/photos", label: "Photos", Icon: Image },
  { href: "/videos", label: "Videos", Icon: Video },
  { href: "/collections", label: "Collections", Icon: Grid3X3 },
  { href: "/favorites", label: "Favorite", Icon: Heart },
];

const DETAIL_PATTERN = /^\/(photos|videos|collections)\/\d+$/;

export default function Header() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isDetailPage = DETAIL_PATTERN.test(pathname);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = navOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [navOpen]);

  const closeNav = () => setNavOpen(false);

  if (isDetailPage) {
    return null;
  }

  return (
    <>
      {navOpen && (
        <div className="fixed inset-0 z-30 bg-scrim/50" onClick={closeNav} />
      )}

      <nav
        className={`fixed top-0 bottom-0 left-0 z-40 overflow-hidden rounded-r-2xl bg-surface transition-all duration-400 ${navOpen ? "visible w-80" : "invisible w-0"} xl:visible xl:w-90 xl:rounded-none`}
      >
        <div
          className={`px-3 pt-2 pb-3 transition-opacity duration-250 ${navOpen ? "opacity-100" : "opacity-0"} xl:opacity-100`}
        >
          <div className="flex h-16 items-center gap-4 px-4">
            <button
              className="icon-btn xl:hidden"
              onClick={closeNav}
              aria-label="Close menu"
            >
              <ArrowLeft size={24} />
            </button>
            <Link
              href="/"
              className="text-[2.6rem] leading-7 font-medium tracking-[-0.5px] text-primary"
            >
              Pixstock
            </Link>
          </div>
        </div>

        <ul
          className={`px-3 transition-opacity duration-250 ${navOpen ? "opacity-100" : "opacity-0"} xl:opacity-100`}
        >
          {NAV_ITEMS.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={closeNav}
                  className={`flex h-14 w-full items-center gap-5 rounded-full px-4 text-label-large capitalize transition-colors ${
                    isActive
                      ? "bg-secondary-container text-on-secondary-container"
                      : "text-on-surface hover:bg-on-surface/8"
                  }`}
                >
                  <item.Icon
                    size={29}
                    fill={isActive ? "currentColor" : "none"}
                  />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Top App Bar */}
      <header
        className={`fixed top-0 right-0 left-0 z-20 flex h-16 items-center px-1 transition-colors ${scrolled ? "bg-surface-container" : "bg-surface"} xl:left-90 xl:bg-background`}
      >
        <button
          className="icon-btn xl:hidden"
          onClick={() => setNavOpen(true)}
          aria-label="Open menu"
        >
          <Menu size={24} />
        </button>

        <Link
          href="/"
          className="mx-1 text-[2.6rem] font-medium text-primary xl:hidden"
        >
          Pixstock
        </Link>

        <div className="mx-2 flex flex-1 justify-end md:justify-center">
          <Suspense fallback={null}>
            <SearchBar />
          </Suspense>
        </div>

        <button
          className="icon-btn theme-btn"
          onClick={toggleTheme}
          aria-label="Switch theme"
        >
          {theme === "dark" ? <Sun size={24} /> : <Moon size={24} />}
        </button>
      </header>

      <div className="h-16 xl:ml-90" />
    </>
  );
}
