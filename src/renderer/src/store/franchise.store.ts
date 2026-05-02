import { create } from "zustand"

export const useFranchiseStore = create(set => ({
  franchises: [
    {
      id: 1,
      name: "McDonald's",
      cities: ["Paris", "Lyon", "Marseille"]
    },
    {
      id: 2,
      name: "Starbucks",
      cities: ["Paris", "Nice"]
    }
  ],

  selectedFranchise: null,
  selectedCity: null,

  selectFranchise: (name) =>
    set({ selectedFranchise: name, selectedCity: null }),

  selectCity: (city) =>
    set({ selectedCity: city }),

  // ⬅️ La fonction qui manquait absolument
  resetSelection: () =>
    set({ selectedFranchise: null, selectedCity: null })
}))
