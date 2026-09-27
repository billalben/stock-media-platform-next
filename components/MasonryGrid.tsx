interface MasonryGridProps {
  children: React.ReactNode;
  className?: string;
}

export default function MasonryGrid({
  children,
  className = "",
}: MasonryGridProps) {
  return (
    <div className={`columns-2 gap-2 md:columns-3 md:gap-3 ${className}`}>
      {children}
    </div>
  );
}
