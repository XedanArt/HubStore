import { contextBridge, ipcRenderer } from "electron"

// ========================
// TYPES
// ========================
export type IpcResponse<T> = {
  success: boolean
  data?: T
  error?: string
}

// ========================
// DATABASE API
// ========================
const databaseApi = {
  getFranchises: (): Promise<IpcResponse<any[]>> =>
    ipcRenderer.invoke("franchise:getAll"),

  createFranchise: (data: { name: string }): Promise<IpcResponse<any>> =>
    ipcRenderer.invoke("franchise:create", data),

  getSites: (): Promise<any[]> =>
    ipcRenderer.invoke("db:getSites"),

  createSite: (data: {
    name: string
    franchiseId: number
    phone?: string | null
    description?: string | null
  }): Promise<any> =>
    ipcRenderer.invoke("db:createSite", data),

  getInterventions: (): Promise<any[]> =>
    ipcRenderer.invoke("db:getInterventions"),

  createIntervention: (data: any): Promise<any> =>
    ipcRenderer.invoke("db:createIntervention", data),
}

// ========================
// AUTH API
// ========================
const authApi = {
  login: (data: { username: string; password: string }): Promise<IpcResponse<any>> =>
    ipcRenderer.invoke("auth:login", data),
}

// ========================
// USERS API
// ========================
const userApi = {
  getUsers: (): Promise<IpcResponse<any[]>> =>
    ipcRenderer.invoke("user:getAll"),

  createUser: (data: {
    username: string
    password: string
    role: "ADMIN" | "USER"
  }): Promise<IpcResponse<any>> =>
    ipcRenderer.invoke("user:create", data),

  deleteUser: (id: number): Promise<IpcResponse<void>> =>
    ipcRenderer.invoke("user:delete", id),
}

// ========================
// EXPOSE API
// ========================
contextBridge.exposeInMainWorld("api", {
  db: databaseApi,
  auth: authApi,
  user: userApi,
})

// ========================
// GLOBAL TYPES
// ========================
declare global {
  interface Window {
    api: {
      db: typeof databaseApi
      auth: typeof authApi
      user: typeof userApi
    }
  }
}