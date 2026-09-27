import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  description: "The page you are looking for does not exist.",
};

export default function NotFound() {
  return (
    <main className="grid flex-1 place-items-center px-4 py-20">
      <div className="max-w-md text-center">
        <p className="text-display-large leading-none text-primary">404</p>
        <h1 className="mt-3 mb-2 text-headline-small md:text-headline-medium">
          Page not found
        </h1>
        <p className="mb-8 text-body-large text-on-surface-variant">
          The page you are looking for does not exist or may have been moved.
        </p>
        <Link
          href="/"
          className="btn-primary inline-flex h-10 items-center gap-2 rounded-full px-6 text-label-large"
        >
          Back to home
        </Link>
      </div>
    </main>
  );
}
