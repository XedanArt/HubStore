import { create } from "zustand"
import { InterventionService } from "../services/intervention.service"

export type Intervention = {
  id: number
  title: string
  description: string | null
  date: string
  resolvedAt?: string | null
  ticketCode: string
}

export type InterventionState = {
  interventions: Intervention[]
  selectedIntervention: Intervention | null
  searchQuery: string
  searchResults: Intervention[]
  loadInterventions: () => Promise<void>
  selectIntervention: (intervention: Intervention) => void
  resetIntervention: () => void
  setSearchQuery: (query: string) => void
  updateIntervention: (id: number, data: Partial<Intervention>) => Promise<void>
  resolveIntervention: (id: number) => Promise<void>
}

export const useInterventionStore = create<InterventionState>((set, get) => ({
  interventions: [],
  selectedIntervention: null,
  searchQuery: "",
  searchResults: [],


  loadInterventions: async () => {
    const res = await InterventionService.getAll()

    const list =
      Array.isArray(res)
        ? res
        : Array.isArray(res?.data)
          ? res.data
          : []

    set({ interventions: list })
  },

  selectIntervention: (intervention) =>
    set({
      selectedIntervention: intervention,
      searchQuery: "",
      searchResults: []
    }),

  resetIntervention: () =>
    set({ selectedIntervention: null }),

  setSearchQuery: (query) => {
    set({ searchQuery: query })

    if (!query.trim()) {
      set({ searchResults: [] })
      return
    }

    const q = query.toLowerCase()

    const all = Array.isArray(get().interventions)
      ? get().interventions
      : []

    const results = all.filter(inter =>
      inter.ticketCode.toLowerCase().includes(q) ||
      inter.title.toLowerCase().includes(q) ||
      (inter.description || "").toLowerCase().includes(q)
    )

    set({ searchResults: results })
  },

  updateIntervention: async (id, data) => {
    set({
      interventions: get().interventions.map(inter =>
        inter.id === id ? { ...inter, ...data } : inter
      ),
      selectedIntervention:
        get().selectedIntervention?.id === id
          ? { ...get().selectedIntervention!, ...data }
          : get().selectedIntervention
    })

    await InterventionService.update(id, data)
  },

  resolveIntervention: async (id) => {
    const resolvedAt = new Date().toISOString()

    set({
      interventions: get().interventions.map(inter =>
        inter.id === id ? { ...inter, resolvedAt } : inter
      ),
      selectedIntervention:
        get().selectedIntervention?.id === id
          ? { ...get().selectedIntervention!, resolvedAt }
          : get().selectedIntervention
    })

    await InterventionService.update(id, { resolvedAt })
  }
}))
