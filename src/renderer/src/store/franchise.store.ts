import { create } from "zustand"
import { FranchiseService } from "../services/franchise.service"

export const useFranchiseStore = create(set => ({
  franchises: [],

  loadFranchises: async () => {
    const data = await FranchiseService.getAll()
    set({ franchises: data })
  },

  createFranchise: async (payload) => {
    await FranchiseService.create(payload)
    const data = await FranchiseService.getAll()
    set({ franchises: data })
  }
}))
