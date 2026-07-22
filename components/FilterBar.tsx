"use client";

import { Check, X, ChevronDown } from "lucide-react";

interface FilterBarProps {
  orientation?: string;
  onOrientationChange: (v: string) => void;
  size?: string;
  onSizeChange: (v: string) => void;
  color?: string;
  onColorChange: (v: string) => void;
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

function FilterChip({
  label,
  selected,
  onClick,
  onClear,
  color,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
  onClear: () => void;
  color?: string;
}) {
  return (
    <div
      className={`h-8 flex items-center border rounded-lg overflow-hidden transition-shadow
        ${selected ? "bg-secondary-container border-none hover:shadow-md" : "border-outline"}`}
    >
      <button
        onClick={selected ? onClear : onClick}
        className="flex items-center h-full px-2"
      >
        {selected && (
          <Check size={28} className="text-on-secondary-container" />
        )}
        {color && !selected && (
          <span
            className="w-4 h-4 rounded-full border border-outline-variant"
            style={{ backgroundColor: color }}
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
  );
}

export default function FilterBar({
  orientation,
  onOrientationChange,
  size,
  onSizeChange,
  color,
  onColorChange,
}: FilterBarProps) {
  const currentOrientation = ORIENTATIONS.find((o) => o.value === orientation);
  const currentSize = SIZES.find((s) => s.value === size);

  return (
    <div className="flex flex-wrap items-center gap-2 my-4">
      <FilterChip
        label={currentOrientation ? currentOrientation.label : "Orientation"}
        selected={!!orientation}
        onClick={() => onOrientationChange("landscape")}
        onClear={() => onOrientationChange("")}
      />
      <FilterChip
        label={currentSize ? currentSize.label : "Size"}
        selected={!!size}
        onClick={() => onSizeChange("medium")}
        onClear={() => onSizeChange("")}
      />
      <FilterChip
        label={color ? color.charAt(0).toUpperCase() + color.slice(1) : "Color"}
        selected={!!color}
        onClick={() => onColorChange("red")}
        onClear={() => onColorChange("")}
        color={color ? COLORS.find((c) => c.value === color)?.hex : undefined}
      />
    </div>
  );
}
