export {}

declare global {
  interface Window {
    api: {
      db: {
        getSites: () => Promise<any>
        createSite: (payload: { name: string; franchiseId: number }) => Promise<any>

        getFranchises: () => Promise<any>
        createFranchise: (payload: { name: string }) => Promise<any>

        getInterventions: () => Promise<any>
        createIntervention: (payload: any) => Promise<any>
      }

      auth: {
        login: (payload: { username: string; password: string }) => Promise<any>
      }
    }
  }
}