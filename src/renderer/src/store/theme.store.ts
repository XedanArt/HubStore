import { create } from "zustand"

export type Theme = "light" | "dark"

export const useThemeStore = create<{
  theme: Theme
  setTheme: (t: Theme) => void
  toggleTheme: () => void
}>((set) => ({
  theme: "light",

  setTheme: (theme) => {
    document.documentElement.classList.remove("theme-light", "theme-dark")
    document.documentElement.classList.add(`theme-${theme}`)
    set({ theme })
  },

  toggleTheme: () =>
    set((state) => {
      const next = state.theme === "light" ? "dark" : "light"
      document.documentElement.classList.remove("theme-light", "theme-dark")
      document.documentElement.classList.add(`theme-${next}`)
      return { theme: next }
    }),
}))
