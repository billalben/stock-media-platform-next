import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  description: "The page you are looking for does not exist.",
};

export default function NotFound() {
  return (
    <main className="flex-1 grid place-items-center px-4 py-20">
      <div className="text-center max-w-md">
        <p className="text-display-large text-primary leading-none">404</p>
        <h1 className="text-headline-small md:text-headline-medium mt-3 mb-2">
          Page not found
        </h1>
        <p className="text-body-large text-on-surface-variant mb-8">
          The page you are looking for does not exist or may have been moved.
        </p>
        <Link
          href="/"
          className="btn-primary h-10 px-6 rounded-full inline-flex items-center gap-2 text-label-large"
        >
          Back to home
        </Link>
      </div>
    </main>
  );
}
