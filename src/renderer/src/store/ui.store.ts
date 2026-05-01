import { create } from "zustand"

interface UIState {
  currentPage: string
  setPage: (page: string) => void
}

export const useUIStore = create<UIState>(set => ({
  currentPage: "dashboard",
  setPage: (page) => set({ currentPage: page }),
}))
