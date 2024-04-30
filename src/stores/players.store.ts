import { generateId } from "../utils";
import zustand from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Player } from "../types";

interface PlayersStore {
  players: Player[];
  addPlayer: (player: Player) => void;
  removePlayer: (id: string) => void;
  updatePlayer: (id: string, player: Partial<Player>) => void;
  reset: () => void;
}

/**
 * @description A store for managing players.
 */
export const usePlayersStore = zustand<PlayersStore>(
  persist(
    (set) => ({
      players: [
        {
          id: 1,
          name: "John Doe",
          color: "error",
        },
        {
          id: 2,
          name: "Jane Doe",
          color: "success",
        },
      ],
      addPlayer: (player: Partial<Player>) =>
        set((state: PlayersStore) => ({
          players: [...state.players, { id: generateId(), ...player }],
        })),
      removePlayer: (id: number) =>
        set((state: PlayersStore) => ({
          players: state.players.filter((player) => player.id !== id),
        })),
      updatePlayer: (id: number, player: Player) =>
        set((state: PlayersStore) => ({
          players: state.players.map((p) =>
            p.id === id ? { ...p, ...player } : p
          ),
        })),
      reset: () =>
        set({
          players: [],
        }),
    }),
    {
      name: "players",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
