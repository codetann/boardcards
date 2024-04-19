import zustand from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface QwixxStore {
  status: "in-progress" | "start" | "results" | "error";
  active: boolean;
  red: [];
  yellow: [];
  green: [];
  blue: [];
  penalty: [];
  add: (color: string, value: number) => void;
  remove: (color: string, value: number) => void;
  clear: () => void;
  check: (color: string, value: number) => boolean;
  penalize: (index: number) => void;
  finish: () => void;
  checkDisabled: (color: string, value: number) => boolean;
  checkUnlocked: (color: string, value: number) => boolean;
  getScores: () => any;
}

export const useQwixxStore = zustand<QwixxStore>(
  persist(
    (set, get) => ({
      status: "start",
      active: false,
      red: [],
      yellow: [],
      green: [],
      blue: [],
      penalty: [false, false, false, false],
      add: (color: string, value: number) => {
        const state = get();

        if (state[color].includes(value)) return;

        set((state: QwixxStore) => ({
          [color]: [...state[color], value],
          status: "in-progress",
        }));
      },
      penalize: (index: number) =>
        set((state: QwixxStore) => {
          const penalties = state.penalty.map((p, i) => (i === index ? !p : p));

          return { penalty: penalties, status: "in-progress" };
        }),

      remove: (color: string, value: number) =>
        set((state: QwixxStore) => ({
          [color]: state[color].filter((v) => v !== value),
          status: "in-progress",
        })),

      clear: () =>
        set((state: QwixxStore) => ({
          red: [],
          yellow: [],
          green: [],
          blue: [],
          penalty: [false, false, false, false],
          status: "start",
        })),
      check: (color: string, value: number) => {
        const state = get();

        if (state[color].includes(value)) return true;

        return false;
      },
      checkDisabled: (color: string, value: number) => {
        const state = get();
        const lastNumber = state[color][state[color].length - 1];

        // handle yellow and red
        if (color === "yellow" || color === "red") {
          if (lastNumber > value) return true;
        }

        // handle green and blue
        if (color === "blue" || color === "green") {
          if (lastNumber < value) return true;
        }

        if (lastNumber === 0) return true;

        return false;
      },
      checkUnlocked: (color: string, value: number) => {
        const state = get();
        const lastNumber = state[color][state[color].length - 1];

        // handle yellow and red
        if (color === "yellow" || color === "red") {
          if (lastNumber < value) return true;
        }

        // handle green and blue
        if (color === "blue" || color === "green") {
          if (lastNumber > value) return true;
        }

        return false;
      },
      finish: () => {
        set({ status: "results" });
      },
    }),

    {
      name: "qwixx",
      storage: createJSONStorage(() => localStorage),
    }
  ) as any
);
