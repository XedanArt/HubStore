import { create } from "zustand"
import { InterventionService } from "../services/intervention.service"

export const useInterventionStore = create((set, get) => ({
  interventions: [],
  selectedIntervention: null,

  searchQuery: "",
  searchResults: [],

  loadInterventions: async () => {
    const data = await InterventionService.getAll()
    set({ interventions: data || [] })
  },

  selectIntervention: (intervention) =>
    set({ selectedIntervention: intervention, searchQuery: "", searchResults: [] }),

  resetIntervention: () =>
    set({ selectedIntervention: null }),

  setSearchQuery: (query) => {
    set({ searchQuery: query })

    if (!query.trim()) {
      set({ searchResults: [] })
      return
    }

    const q = query.toLowerCase()
    const all = get().interventions

    const results = all.filter(inter =>
      inter.ticketCode.toLowerCase().includes(q) ||
      inter.title.toLowerCase().includes(q) ||
      (inter.description || "").toLowerCase().includes(q)
    )

    set({ searchResults: results })
  }
}))
