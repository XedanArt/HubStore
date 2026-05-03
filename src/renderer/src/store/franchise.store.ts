import { create } from "zustand"
import { FranchiseService } from "../services/franchise.service"

type Franchise = {
  id: number
  name: string
}

type FranchiseState = {
  franchises: Franchise[]
  selectedFranchise: string | null
  selectedSite: string | null

  loadFranchises: () => Promise<void>
  createFranchise: (payload: { name: string }) => Promise<void>

  selectFranchise: (name: string) => void
  selectSite: (name: string) => void
  resetSelection: () => void
}

export const useFranchiseStore = create<FranchiseState>((set) => ({
  franchises: [],

  selectedFranchise: null,
  selectedSite: null,

  loadFranchises: async () => {
    const data = await FranchiseService.getAll()
    set({ franchises: data || [] })
  },

  createFranchise: async (payload) => {
    await FranchiseService.create(payload)
    const data = await FranchiseService.getAll()
    set({ franchises: data || [] })
  },

  selectFranchise: (name) =>
    set({
      selectedFranchise: name,
      selectedSite: null,
    }),

  selectSite: (name) =>
    set({
      selectedSite: name,
    }),

  resetSelection: () =>
    set({
      selectedFranchise: null,
      selectedSite: null,
    }),
}))
