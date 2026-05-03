export const FranchiseService = {
  async getAll() {
    const res = await window.api.db.getFranchises()

    if (!res.success) {
      throw new Error(res.error || "Erreur lors du fetch des franchises")
    }

    return res.data
  },

  async create(data: { name: string }) {
    const res = await window.api.db.createFranchise(data)

    if (!res.success) {
      throw new Error(res.error || "Erreur lors de la création")
    }

    return res.data
  },
}

