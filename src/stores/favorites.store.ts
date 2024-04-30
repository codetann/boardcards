import { create } from "zustand";

interface FavoritesStore {
  favorites: string[];
  addFavorite: (favorite: string) => void;
  removeFavorite: (favorite: string) => void;
  isFavorite: (favorite: string) => boolean;
  reset: () => void;
}

export const useFavoritesStore = create<FavoritesStore>((set, get) => ({
  favorites: [],
  addFavorite: (favorite: string) =>
    set((state) => ({
      favorites: [...state.favorites, favorite],
    })),
  removeFavorite: (favorite: string) =>
    set((state) => ({
      favorites: state.favorites.filter((f) => f !== favorite),
    })),
  isFavorite: (favorite: string) => get().favorites.includes(favorite),
  reset: () => set({ favorites: [] }),
}));
