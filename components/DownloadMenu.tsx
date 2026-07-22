"use client";

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
        <span className="material-symbols-outlined text-[1.8rem]">download</span>
      </span>
    </a>
  );
}
