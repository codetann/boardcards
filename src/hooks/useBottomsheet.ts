import { create } from "zustand";

type Bottomsheet = {
  isOpen: boolean;
  html: JSX.Element | JSX.Element[] | string;
  open: ({}: any) => void;
  close: () => void;
};

export const useBottomsheet = create<Bottomsheet>((set) => ({
  isOpen: false,
  html: "",
  open: ({ html }: any) => set({ isOpen: true, html }),
  close: () => set({ isOpen: false }),
}));
