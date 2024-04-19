import { create } from "zustand";

type ModalState = {
  isOpen: boolean;
  message?: string;
  title?: string;
  open: ({}: any) => void;
  close: () => void;
  onConfirm?: () => void;
};

export const useModal = create<ModalState>((set) => ({
  isOpen: false,
  message: "",
  title: "",
  onConfirm: () => {},
  open: ({ message, title, onConfirm }: any) =>
    set({ isOpen: true, message, title, onConfirm }),
  close: () => set({ isOpen: false }),
}));
