import { create } from "zustand";

interface LoadingState {
  imageLoading: boolean;
  setImageLoading: (isLoading: boolean) => void;
}

export const useLoadingStore = create<LoadingState>((set) => ({
  imageLoading: true,
  setImageLoading: (isLoading) => set({ imageLoading: isLoading }),
}));
