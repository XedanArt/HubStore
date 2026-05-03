export const SiteService = {
  getAll: () => window.api.db.getSites(),

  create: (payload: {
    name: string
    franchiseId: number
    phone?: string | null
    description?: string | null
  }) => window.api.db.createSite(payload),
}
