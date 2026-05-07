import { create } from "zustand"
import { FranchiseService } from "../services/franchise.service"

type Site = {
  id: number
  name: string
  phone?: string | null
  description?: string | null
  franchiseId: number
}

type Franchise = {
  id: number
  name: string
  code: string        
  sites: Site[]
}

type FranchiseState = {
  franchises: Franchise[]
  selectedFranchise: Franchise | null
  selectedSite: Site | null

  loadFranchises: () => Promise<void>
  createFranchise: (payload: { name: string; code: string }) => Promise<void>

  selectFranchise: (franchise: Franchise) => void
  selectSite: (site: Site) => void
  resetSelection: () => void
}

export const useFranchiseStore = create<FranchiseState>((set) => ({
  franchises: [],

  selectedFranchise: null,
  selectedSite: null,

  loadFranchises: async () => {
  const res = await FranchiseService.getAll()
  const data = res?.data || res || []
  console.log("Franchises loaded:", data)
  set({ franchises: [...data] })
  },


  createFranchise: async (payload) => {
  await FranchiseService.create(payload)
  const res = await FranchiseService.getAll()
  const data = res?.data || res || []
  set({ franchises: [...data] })
  },


  selectFranchise: (franchise) =>
    set({
      selectedFranchise: franchise,
      selectedSite: null,
    }),

  selectSite: (site) =>
    set({
      selectedSite: site,
    }),

  resetSelection: () =>
    set({
      selectedFranchise: null,
      selectedSite: null,
    }),
}))
