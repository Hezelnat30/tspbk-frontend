import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SidebarState {
  isOpen: boolean;
  toggleSidebar: () => void;
  setSidebarOpen: (isOpen: boolean) => void;
}

export const useSidebarStore = create<SidebarState>()(
  persist(
    (set) => ({
      isOpen: true,
      toggleSidebar: () => set((state) => ({ isOpen: !state.isOpen })),
      setSidebarOpen: (isOpen: boolean) => set({ isOpen }),
    }),
    {
      name: "sidebar-state",
    }
  )
);

interface IncrementState {
  count: number;
  increment: (value: number) => void;
  decrement: () => void;
}

export const useSumStore = create<IncrementState>((set) => ({
  count: 0,
  increment: (value: number) =>
    set((state) => ({ count: state.count + value })),
  decrement: () =>
    set((state) => ({ count: state.count > 0 ? state.count - 1 : 0 })),
}));
