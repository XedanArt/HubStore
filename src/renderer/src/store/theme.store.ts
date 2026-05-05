import { create } from "zustand"

type Theme = "light" | "dark"

type ThemeState = {
  theme: Theme
  toggleTheme: () => void
  setTheme: (theme: Theme) => void
}

export const useThemeStore = create<ThemeState>((set) => ({
  theme: "light",

  setTheme: (theme) => {
    const root = document.documentElement

    root.classList.add("theme-transition")

    root.classList.remove("theme-light", "theme-dark")
    root.classList.add(`theme-${theme}`)

    localStorage.setItem("theme", theme)

    set({ theme })

    setTimeout(() => {
      root.classList.remove("theme-transition")
    }, 300)
  },

  toggleTheme: () => {
    const root = document.documentElement

    root.classList.add("theme-transition")

    set((state) => {
      const newTheme = state.theme === "light" ? "dark" : "light"

      root.classList.remove("theme-light", "theme-dark")
      root.classList.add(`theme-${newTheme}`)

      localStorage.setItem("theme", newTheme)

      return { theme: newTheme }
    })

    setTimeout(() => {
      root.classList.remove("theme-transition")
    }, 300)
  },
}))

