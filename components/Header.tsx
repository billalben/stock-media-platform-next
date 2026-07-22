"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@/context/ThemeProvider";
import SearchBar from "./SearchBar";

const NAV_ITEMS = [
  { href: "/", label: "Home", icon: "home" },
  { href: "/photos", label: "Photos", icon: "image" },
  { href: "/videos", label: "Videos", icon: "videocam" },
  { href: "/collections", label: "Collections", icon: "auto_awesome_mosaic" },
  { href: "/favorites", label: "Favorite", icon: "favorite" },
];

export default function Header() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = navOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [navOpen]);

  const closeNav = () => setNavOpen(false);

  return (
    <>
      {navOpen && (
        <div
          className="fixed inset-0 z-30 bg-scrim/50"
          onClick={closeNav}
        />
      )}

      <nav
        className={`fixed top-0 left-0 bottom-0 z-40 bg-surface rounded-r-2xl transition-all duration-[400ms] overflow-hidden
          ${navOpen ? "w-80 visible" : "w-0 invisible"}
          xl:w-[360px] xl:visible xl:rounded-none`}
      >
        <div
          className={`px-3 pt-2 pb-3 transition-opacity duration-[250ms] ${navOpen ? "opacity-100" : "opacity-0"} xl:opacity-100`}
        >
          <div className="flex items-center gap-4 px-4 h-16">
            <button
              className="icon-btn xl:hidden"
              onClick={closeNav}
              aria-label="Close menu"
            >
              <span className="material-symbols-outlined">arrow_back</span>
            </button>
            <Link href="/" className="text-[2.6rem] font-medium text-primary tracking-[-0.5px] leading-7">
              Pixstock
            </Link>
          </div>
        </div>

        <ul
          className={`px-3 transition-opacity duration-[250ms] ${navOpen ? "opacity-100" : "opacity-0"} xl:opacity-100`}
        >
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={closeNav}
                  className={`flex items-center gap-5 w-full h-14 px-4 rounded-full capitalize text-label-large transition-colors
                    ${isActive
                      ? "bg-secondary-container text-on-secondary-container"
                      : "text-on-surface hover:bg-on-surface/[0.08]"
                    }`}
                >
                  <span
                    className={`material-symbols-outlined text-[1.8rem] ${isActive ? "font-variation-filled" : ""}`}
                  >
                    {item.icon}
                  </span>
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Top App Bar */}
      <header
        className={`fixed top-0 right-0 left-0 z-20 flex items-center h-16 px-1 transition-colors
          ${scrolled ? "bg-surface-container" : "bg-surface"}
          xl:left-[360px] xl:bg-background`}
      >
        <button
          className="icon-btn xl:hidden"
          onClick={() => setNavOpen(true)}
          aria-label="Open menu"
        >
          <span className="material-symbols-outlined">menu</span>
        </button>

        <Link href="/" className="text-[2.6rem] font-medium text-primary mx-1 xl:hidden">
          Pixstock
        </Link>

        <div className="flex-1 flex justify-center mx-2">
          <Suspense fallback={null}>
            <SearchBar />
          </Suspense>
        </div>

        <button
          className="icon-btn theme-btn"
          onClick={toggleTheme}
          aria-label="Switch theme"
        >
          <span className="material-symbols-outlined">
            {theme === "dark" ? "light_mode" : "dark_mode"}
          </span>
        </button>
      </header>

      <div className="h-16 xl:ml-[360px]" />
    </>
  );
}
