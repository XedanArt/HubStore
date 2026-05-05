import { create } from "zustand"

export type View =
  | "home"
  | "create"
  | "manage"
  | "users"
  | "query"

interface UIState {
  activeView: View
  setPage: (view: View) => void
}

export const useUIStore = create<UIState>((set) => ({
  activeView: "home",

  setPage: (view) => set({ activeView: view }),
}))