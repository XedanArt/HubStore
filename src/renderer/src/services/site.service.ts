export const SiteService = {
  getAll: () => window.hubstore.db.getSites(),

  create: (payload: {
    name: string
    franchiseId: number
    phone?: string | null
    description?: string | null
  }) => window.hubstore.db.createSite(payload),
}
