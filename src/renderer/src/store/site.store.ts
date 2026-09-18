import { create } from "zustand"
import { SiteService } from "../services/site.service"

type Site = {
  id: number
  name: string
  franchiseId: number
}

type SiteState = {
  sites: Site[]
  loadSites: () => Promise<void>
  createSite: (payload: { name: string; franchiseId: number }) => Promise<void>
}

export const useSiteStore = create<SiteState>((set) => ({
  sites: [],

  loadSites: async () => {
    const res = await SiteService.getAll()

    const list =
      Array.isArray(res)
        ? res
        : Array.isArray(res?.data)
          ? res.data
          : []

    set({ sites: list })
  },

  createSite: async (payload) => {
    await SiteService.create(payload)
    const res = await SiteService.getAll()

    const list =
      Array.isArray(res)
        ? res
        : Array.isArray(res?.data)
          ? res.data
          : []

    set({ sites: list })
  },
}))
