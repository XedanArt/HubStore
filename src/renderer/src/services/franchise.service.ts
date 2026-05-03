export const FranchiseService = {
  getAll: () => window.api.db.getFranchises(),

  create: (data: { name: string }) =>
    window.api.db.createFranchise(data)
}
