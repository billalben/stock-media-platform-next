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
    <main className="flex-1 grid place-items-center px-4 py-20">
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
  );
}
