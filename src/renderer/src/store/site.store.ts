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
    const data = await SiteService.getAll()
    set({ sites: data || [] })
  },

  createSite: async (payload) => {
    await SiteService.create(payload)
    const data = await SiteService.getAll()
    set({ sites: data || [] })
  },
}))
