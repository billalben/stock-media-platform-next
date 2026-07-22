"use client";

import { useState, useCallback, useEffect } from "react";

const STORAGE_KEY = "search_history";
const MAX_ITEMS = 5;

function loadHistory(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return parsed.items || [];
  } catch {
    return [];
  }
}

function saveHistory(items: string[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ items }));
}

export function useSearchHistory() {
  const [history, setHistory] = useState<string[]>([]);

   
  useEffect(() => {
    setHistory(loadHistory());
  }, []);

  const addToHistory = useCallback((query: string) => {
    setHistory((prev) => {
      const filtered = prev.filter((item) => item !== query);
      const next = [query, ...filtered].slice(0, MAX_ITEMS);
      saveHistory(next);
      return next;
    });
  }, []);

  return { history, addToHistory };
}
