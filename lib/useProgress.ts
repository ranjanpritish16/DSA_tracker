"use client";

import { useCallback, useEffect, useState } from "react";
import { Category, ProblemState } from "./types";
import { getProgressHeaders } from "./user";

const STORAGE_KEY = "dsa-tracker:progress:v1";

export type ProgressMap = Record<string, ProblemState>;

function emptyState(): ProblemState {
  return { category: null, solved: false, withHint: false, notes: "", lastTouched: null };
}

function loadFromStorage(): ProgressMap {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as ProgressMap) : {};
  } catch {
    return {};
  }
}

export function useProgress() {
  const [progress, setProgress] = useState<ProgressMap>({});
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setProgress(loadFromStorage());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch {
      // storage full or unavailable — fail silently, in-memory state still works
    }
  }, [progress, hydrated]);

  const getState = useCallback(
    (id: string): ProblemState => progress[id] ?? emptyState(),
    [progress]
  );

  const update = useCallback((id: string, patch: Partial<ProblemState>) => {
    setProgress((prev) => {
      const current = prev[id] ?? emptyState();
      return {
        ...prev,
        [id]: { ...current, ...patch, lastTouched: new Date().toISOString() },
      };
    });
  }, []);

  const saveProgress = useCallback(async (id: string, state: ProblemState) => {
    try {
      await fetch("/api/progress", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...getProgressHeaders(),
        },
        body: JSON.stringify({
          problemId: id,
          category: state.category,
          solved: state.solved,
          withHint: state.withHint,
          notes: state.notes,
        }),
      });
    } catch (error) {
      console.warn("Failed to save progress to server", error);
    }
  }, []);

  const setCategory = useCallback(
    (id: string, category: Category) => {
      const current = progress[id] ?? emptyState();
      const next = { ...current, category, solved: category !== null, lastTouched: new Date().toISOString() };
      update(id, { category, solved: category !== null });
      void saveProgress(id, next);
    },
    [progress, saveProgress, update]
  );

  const toggleSolved = useCallback(
    (id: string) => {
      const current = progress[id] ?? emptyState();
      const next = { ...current, solved: !current.solved, lastTouched: new Date().toISOString() };
      update(id, { solved: !current.solved });
      void saveProgress(id, next);
    },
    [progress, saveProgress, update]
  );

  const toggleHint = useCallback(
    (id: string) => {
      const current = progress[id] ?? emptyState();
      const next = { ...current, withHint: !current.withHint, lastTouched: new Date().toISOString() };
      update(id, { withHint: !current.withHint });
      void saveProgress(id, next);
    },
    [progress, saveProgress, update]
  );

  const setNotes = useCallback(
    (id: string, notes: string) => {
      const current = progress[id] ?? emptyState();
      const next = { ...current, notes, lastTouched: new Date().toISOString() };
      update(id, { notes });
      void saveProgress(id, next);
    },
    [progress, saveProgress, update]
  );

  const resetAll = useCallback(() => {
    setProgress({});
  }, []);

  return { progress, hydrated, getState, setCategory, toggleSolved, toggleHint, setNotes, resetAll };
}
