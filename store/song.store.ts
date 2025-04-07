import { create } from "zustand";

interface SongStore {
  selectedSong: string;
  setSelectedSong: (id: string) => void;
}

export const useSongStore = create<SongStore>((set) => ({
  selectedSong: "",
  setSelectedSong: (id) => set({ selectedSong: id }),
}));
