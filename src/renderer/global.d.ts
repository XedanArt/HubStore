export {}

declare global {
  interface Window {
    hubstore: {
      auth: {
        login: (data: { username: string; password: string }) => Promise<any>
      }
      db: {
        getInterventions: () => Promise<any>
        getFranchises: () => Promise<any>
        getSites: () => Promise<any>
      }
      user: {
        getUsers: () => Promise<any>
      }
    }
  }
}
