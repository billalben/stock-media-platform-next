"use client";

import { useState, useRef, useEffect } from "react";
import { Check, X, ChevronDown } from "lucide-react";

interface FilterBarProps {
  orientation?: string;
  onOrientationChange: (v: string) => void;
  size?: string;
  onSizeChange: (v: string) => void;
  color?: string;
  onColorChange: (v: string) => void;
  showColor?: boolean;
}

const ORIENTATIONS = [
  { label: "Portrait", value: "portrait" },
  { label: "Landscape", value: "landscape" },
  { label: "Square", value: "square" },
];

const SIZES = [
  { label: "Small", value: "small" },
  { label: "Medium", value: "medium" },
  { label: "Large", value: "large" },
];

const COLORS = [
  { label: "Red", value: "red", hex: "#EF5350" },
  { label: "Orange", value: "orange", hex: "#FF9800" },
  { label: "Yellow", value: "yellow", hex: "#FFEB3B" },
  { label: "Green", value: "green", hex: "#4CAF50" },
  { label: "Turquoise", value: "turquoise", hex: "#00BCD4" },
  { label: "Blue", value: "blue", hex: "#2196F3" },
  { label: "Violet", value: "violet", hex: "#9C27B0" },
  { label: "Pink", value: "pink", hex: "#E91E63" },
  { label: "Brown", value: "brown", hex: "#795548" },
  { label: "Black", value: "black", hex: "#212121" },
  { label: "Gray", value: "gray", hex: "#9E9E9E" },
  { label: "White", value: "white", hex: "#FFFFFF" },
];

function FilterChip<T extends { label: string; value: string; hex?: string }>({
  label,
  selected,
  options,
  onSelect,
  onClear,
  colorPreview,
}: {
  label: string;
  selected: boolean;
  options: T[];
  onSelect: (v: string) => void;
  onClear: () => void;
  colorPreview?: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <div
        className={`h-8 flex items-center border rounded-lg overflow-hidden transition-shadow
          ${selected ? "bg-secondary-container border-none hover:shadow-md" : "border-outline"}`}
      >
        <button
          onClick={() => (selected ? onClear() : setOpen((p) => !p))}
          className="flex items-center h-full px-2"
        >
          {selected && (
            <Check size={28} className="text-on-secondary-container" />
          )}
          {colorPreview && !selected && (
            <span
              className="w-4 h-4 rounded-full border border-outline-variant"
              style={{ backgroundColor: colorPreview }}
            />
          )}
          <span
            className={`text-label-medium px-2 capitalize ${selected ? "text-on-secondary-container" : "text-on-surface-variant"}`}
          >
            {label}
          </span>
          {selected ? (
            <X size={28} className="text-on-surface-variant" />
          ) : (
            <ChevronDown size={28} className="text-on-surface-variant" />
          )}
        </button>
      </div>

      {open && (
        <div className="absolute top-full left-0 mt-1 py-2 min-w-40 w-max bg-surface-container rounded-lg shadow-[0_1px_2px_rgba(0,0,0,0.3),0_2px_6px_2px_rgba(0,0,0,0.15)] z-50 animate-[menu-in_200ms_ease_forwards]">
          {options.map((opt) => (
            <button
              key={opt.value}
              className="flex items-center gap-3 w-full h-12 px-4 text-body-large text-on-surface hover:bg-on-surface/8"
              onClick={() => {
                onSelect(opt.value);
                setOpen(false);
              }}
            >
              {opt.hex && (
                <span
                  className="w-5 h-5 rounded-full border border-outline-variant shrink-0"
                  style={{ backgroundColor: opt.hex }}
                />
              )}
              <span className="capitalize">{opt.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function FilterBar({
  orientation,
  onOrientationChange,
  size,
  onSizeChange,
  color,
  onColorChange,
  showColor = true,
}: FilterBarProps) {
  const currentOrientation = ORIENTATIONS.find((o) => o.value === orientation);
  const currentSize = SIZES.find((s) => s.value === size);
  const currentColor = COLORS.find((c) => c.value === color);

  return (
    <div className="flex flex-wrap items-center gap-2 my-4">
      <FilterChip
        label={currentOrientation ? currentOrientation.label : "Orientation"}
        selected={!!orientation}
        options={ORIENTATIONS}
        onSelect={onOrientationChange}
        onClear={() => onOrientationChange("")}
      />
      <FilterChip
        label={currentSize ? currentSize.label : "Size"}
        selected={!!size}
        options={SIZES}
        onSelect={onSizeChange}
        onClear={() => onSizeChange("")}
      />
      {showColor && (
        <FilterChip
          label={currentColor ? currentColor.label : "Color"}
          selected={!!color}
          options={COLORS}
          onSelect={onColorChange}
          onClear={() => onColorChange("")}
          colorPreview={currentColor?.hex}
        />
      )}
    </div>
  );
}
