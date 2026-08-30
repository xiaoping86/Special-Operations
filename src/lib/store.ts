import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ExamRecord } from "./types";

type BankState = {
  fontScale: number;
  lastSeqIndex: number;
  answered: Record<number, string>;
  wrong: number[];
  favorites: number[];
  exams: ExamRecord[];
  setFontScale: (n: number) => void;
  setLastSeqIndex: (n: number) => void;
  markAnswer: (id: number, choice: string, correct: boolean) => void;
  clearWrong: () => void;
  toggleFav: (id: number) => void;
  addExam: (r: ExamRecord) => void;
};

export const useBank = create<BankState>()(
  persist(
    (set, get) => ({
      fontScale: 1,
      lastSeqIndex: 0,
      answered: {},
      wrong: [],
      favorites: [],
      exams: [],
      setFontScale: (n) => set({ fontScale: Math.min(1.45, Math.max(0.85, n)) }),
      setLastSeqIndex: (n) => set({ lastSeqIndex: n }),
      markAnswer: (id, choice, correct) => {
        const answered = { ...get().answered, [id]: choice };
        let wrong = get().wrong.filter((x) => x !== id);
        if (!correct) wrong = [id, ...wrong];
        set({ answered, wrong });
      },
      clearWrong: () => set({ wrong: [] }),
      toggleFav: (id) => {
        const fav = get().favorites;
        set({
          favorites: fav.includes(id) ? fav.filter((x) => x !== id) : [id, ...fav],
        });
      },
      addExam: (r) => set({ exams: [r, ...get().exams].slice(0, 40) }),
    }),
    { name: "diya-tiku-v1" },
  ),
);
