"use client";

import {
  useCallback,
  useRef,
  type MouseEvent,
  type PointerEvent,
  type ReactNode,
} from "react";

const DRAG_THRESHOLD = 5;

interface DragScrollProps {
  className?: string;
  label?: string;
  children: ReactNode;
}

export default function DragScroll({
  className,
  label,
  children,
}: DragScrollProps) {
  const drag = useRef({
    active: false,
    moved: false,
    startX: 0,
    startScroll: 0,
  });

  const handlePointerDown = useCallback((e: PointerEvent<HTMLElement>) => {
    if (e.pointerType === "touch" || e.button !== 0) return;
    drag.current = {
      active: true,
      moved: false,
      startX: e.clientX,
      startScroll: e.currentTarget.scrollLeft,
    };
  }, []);

  const handlePointerMove = useCallback((e: PointerEvent<HTMLElement>) => {
    const state = drag.current;
    if (!state.active) return;

    const el = e.currentTarget;
    const dx = e.clientX - state.startX;

    if (!state.moved && Math.abs(dx) > DRAG_THRESHOLD) {
      state.moved = true;
      el.classList.add("dragging");
      el.setPointerCapture(e.pointerId);
    }

    if (state.moved) {
      e.preventDefault();
      el.scrollLeft = state.startScroll - dx;
    }
  }, []);

  const handlePointerUp = useCallback((e: PointerEvent<HTMLElement>) => {
    const el = e.currentTarget;
    if (el.hasPointerCapture(e.pointerId)) {
      el.releasePointerCapture(e.pointerId);
    }
    drag.current.active = false;
    el.classList.remove("dragging");
  }, []);

  const handleClickCapture = useCallback((e: MouseEvent<HTMLElement>) => {
    if (!drag.current.moved) return;
    e.preventDefault();
    e.stopPropagation();
    drag.current.moved = false;
  }, []);

  return (
    <section
      className={className}
      aria-label={label}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onClickCapture={handleClickCapture}
    >
      {children}
    </section>
  );
}
