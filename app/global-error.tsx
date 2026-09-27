"use client";

import "./globals.css";

export default function GlobalError({
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  return (
    <html lang="en">
      <body>
        <main className="grid min-h-screen place-items-center px-4 py-20">
          <div className="max-w-md text-center">
            <h1 className="mb-2 text-headline-small md:text-headline-medium">
              Something went wrong
            </h1>
            <p className="mb-8 text-body-large text-on-surface-variant">
              An unexpected error occurred. Please try again.
            </p>
            <button
              type="button"
              onClick={() => unstable_retry()}
              className="btn-primary inline-flex h-10 items-center gap-2 rounded-full px-6 text-label-large"
            >
              Try again
            </button>
          </div>
        </main>
      </body>
    </html>
  );
}
