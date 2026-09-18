export const InterventionService = {
  getAll: () => window.hubstore.db.getInterventions(),

  create: (data: {
    title: string
    description?: string
    siteId: number
    date: string
    resolvedAt?: string | null
    createdById?: number
  }) => window.hubstore.db.createIntervention(data),

  update: (id: number, data: any) =>
    window.hubstore.db.updateIntervention(id, data)
}
