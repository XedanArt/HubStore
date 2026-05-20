import { create } from "zustand"
import { InterventionService } from "../services/intervention.service"

export const useInterventionStore = create((set, get) => ({
  interventions: [],
  selectedIntervention: null,

  searchQuery: "",
  searchResults: [],

  // Charger toutes les interventions
  loadInterventions: async () => {
    const data = await InterventionService.getAll()
    set({ interventions: data || [] })
  },

  // Sélectionner une intervention
  selectIntervention: (intervention) =>
    set({ selectedIntervention: intervention, searchQuery: "", searchResults: [] }),

  resetIntervention: () =>
    set({ selectedIntervention: null }),

  // Recherche
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
  },

  // Mettre à jour une intervention (ex: description)
  updateIntervention: async (id, data) => {
    // Mise à jour optimiste dans le store
    set({
      interventions: get().interventions.map(inter =>
        inter.id === id ? { ...inter, ...data } : inter
      ),
      selectedIntervention:
        get().selectedIntervention?.id === id
          ? { ...get().selectedIntervention, ...data }
          : get().selectedIntervention
    })

    // Mise à jour en base
    await InterventionService.update(id, data)
  },

  // Marquer comme résolue
  resolveIntervention: async (id) => {
    const resolvedAt = new Date()

    // Mise à jour optimiste
    set({
      interventions: get().interventions.map(inter =>
        inter.id === id ? { ...inter, resolvedAt } : inter
      ),
      selectedIntervention:
        get().selectedIntervention?.id === id
          ? { ...get().selectedIntervention, resolvedAt }
          : get().selectedIntervention
    })

    // Mise à jour en base
    await InterventionService.update(id, { resolvedAt })
  }
}))
