export const InterventionService = {
  getAll: () => window.api.db.getInterventions(),

  create: (data: {
    title: string
    description?: string
    siteId: number
    date: string
    resolvedAt?: string | null
    createdById?: number
  }) => window.api.db.createIntervention(data)
}