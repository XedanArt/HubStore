export const SiteService = {
  getAll: () => window.api.db.getSites(),

  create: (data: { name: string; franchiseId: number }) =>
    window.api.db.createSite(data)
}
