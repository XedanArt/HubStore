import { contextBridge, ipcRenderer } from "electron"

type IpcResponse<T> = {
  success: boolean
  data?: T
  error?: string
}

const databaseApi = {
  // ========================
  // FRANCHISES
  // ========================
  getFranchises: (): Promise<IpcResponse<any[]>> =>
    ipcRenderer.invoke("franchise:getAll"),

  createFranchise: (data: { name: string }): Promise<IpcResponse<any>> =>
    ipcRenderer.invoke("franchise:create", data),

  // ========================
  // SITES
  // ========================
  getSites: (): Promise<any[]> =>
    ipcRenderer.invoke("db:getSites"),

  createSite: (data: {
    name: string
    franchiseId: number
    phone?: string | null
    description?: string | null
  }): Promise<any> =>
    ipcRenderer.invoke("db:createSite", data),

  // ========================
  // INTERVENTIONS
  // ========================
  getInterventions: (): Promise<any[]> =>
    ipcRenderer.invoke("db:getInterventions"),

  createIntervention: (data: any): Promise<any> =>
    ipcRenderer.invoke("db:createIntervention", data),
}

contextBridge.exposeInMainWorld("api", {
  db: databaseApi,
})

declare global {
  interface Window {
    api: {
      db: typeof databaseApi
    }
  }
}
