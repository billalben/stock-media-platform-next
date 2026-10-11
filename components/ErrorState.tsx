"use client";

import { useRouter } from "next/navigation";
import { AlertTriangle, RefreshCw } from "lucide-react";

interface ErrorStateProps {
  title: string;
  message: string;
  onRetry?: () => void;
}

export default function ErrorState({
  title,
  message,
  onRetry,
}: ErrorStateProps) {
  const router = useRouter();

  return (
    <div
      role="alert"
      className="mx-auto flex max-w-md flex-col items-center gap-3 px-4 py-14 text-center"
    >
      <div className="grid h-14 w-14 place-items-center rounded-full bg-error-container text-on-error-container">
        <AlertTriangle size={26} aria-hidden="true" />
      </div>
      <h2 className="text-title-large">{title}</h2>
      <p className="text-body-medium text-on-surface-variant">{message}</p>
      <button
        type="button"
        onClick={onRetry ?? (() => router.refresh())}
        className="btn-primary mt-1 inline-flex h-10 items-center gap-2 rounded-full px-6 text-label-large"
      >
        <RefreshCw size={18} aria-hidden="true" />
        Try again
      </button>
    </div>
  );
}
