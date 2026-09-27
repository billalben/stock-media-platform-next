"use client";

import { useEffect } from "react";

export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="grid flex-1 place-items-center px-4 py-20">
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
  );
}
