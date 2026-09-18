import { create } from "zustand"

type User = {
  id: number
  username: string
  role: "ADMIN" | "USER"
}

type AuthState = {
  user: User | null
  login: (username: string, password: string) => Promise<boolean>
  logout: () => void
  isAdmin: () => boolean
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,

  login: async (username: string, password: string) => {
    const res = await window.hubstore.auth.login({
      username,
      password
    })

    if (res.success && res.data) {
      set({ user: res.data })
      return true
    }

    return false
  },

  logout: () => set({ user: null }),

  isAdmin: () => {
    const user = get().user
    return user?.role === "ADMIN"
  }
}))
