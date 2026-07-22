"use client";

import { Download } from "lucide-react";

interface DownloadMenuProps {
  downloads: { label: string; url: string }[];
}

export default function DownloadMenu({ downloads }: DownloadMenuProps) {
  return (
    <a
      href={downloads[0]?.url || "#"}
      target="_blank"
      rel="noopener"
      className="inline-flex items-center h-10 bg-primary text-on-primary rounded-full overflow-hidden"
    >
      <span className="px-4 h-full grid place-items-center border-r border-outline-variant">
        Download
      </span>
      <span className="w-10 h-full grid place-items-center">
        <Download size={28} />
      </span>
    </a>
  );
}
