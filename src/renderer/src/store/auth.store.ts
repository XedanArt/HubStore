import { create } from "zustand"

export const useAuthStore = create((set, get) => ({
  user: null,

  login: async (username, password) => {
    const res = await window.api.auth.login({
      username,
      password
    })

    if (res.success) {
      set({ user: res.data })
      return true
    }

    return false
  },

  logout: () => set({ user: null }),

  isAdmin: () => get().user?.role === "ADMIN"
}))