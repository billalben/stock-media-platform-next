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
        <main className="min-h-screen grid place-items-center px-4 py-20">
          <div className="text-center max-w-md">
            <h1 className="text-headline-small md:text-headline-medium mb-2">
              Something went wrong
            </h1>
            <p className="text-body-large text-on-surface-variant mb-8">
              An unexpected error occurred. Please try again.
            </p>
            <button
              type="button"
              onClick={() => unstable_retry()}
              className="btn-primary h-10 px-6 rounded-full inline-flex items-center gap-2 text-label-large"
            >
              Try again
            </button>
          </div>
        </main>
      </body>
    </html>
  );
}
