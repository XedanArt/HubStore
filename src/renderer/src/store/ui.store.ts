import { create } from "zustand"

interface UIState {
  activeView: "home" | "create" | "manage"
  setPage: (view: UIState["activeView"]) => void
}

export const useUIStore = create<UIState>(set => ({
  activeView: "home",

  setPage: (view) => set({ activeView: view }),
}))
