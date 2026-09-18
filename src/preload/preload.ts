import { contextBridge, ipcRenderer } from "electron"

export type IpcResponse<T> = {
  success: boolean
  data?: T
  error?: string
}

function safeInvoke<T = unknown>(channel: string, payload?: unknown): Promise<IpcResponse<T>> {
  return ipcRenderer.invoke(channel, payload)
}

// ========================
// DATABASE API
// ========================
const dbApi = {
  getFranchises: () =>
    safeInvoke<any[]>("franchise:getAll"),

  createFranchise: (data: { name: string }) =>
    safeInvoke<any>("franchise:create", data),

  getSites: () =>
    safeInvoke<any[]>("site:getAll"),

  createSite: (data: {
    name: string
    franchiseId: number
    phone?: string | null
    description?: string | null
  }) =>
    safeInvoke<any>("site:create", data),

  getInterventions: () =>
    safeInvoke<any[]>("intervention:getAll"),

  createIntervention: (data: any) =>
    safeInvoke<any>("intervention:create", data),

  updateIntervention: (id: number, data: any) =>
    safeInvoke<any>("intervention:update", { id, data }),
}

// ========================
// AUTH API
// ========================
const authApi = {
  login: (data: { username: string; password: string }) =>
    safeInvoke<any>("auth:login", data),
}

// ========================
// USERS API
// ========================
const userApi = {
  getUsers: () =>
    safeInvoke<any[]>("user:getAll"),

  createUser: (data: {
    username: string
    password: string
    role: "ADMIN" | "USER"
  }) =>
    safeInvoke<any>("user:create", data),

  deleteUser: (id: number) =>
    safeInvoke<void>("user:delete", id),
}

// ========================
// EXPOSE API
// ========================
contextBridge.exposeInMainWorld("hubstore", {
  db: dbApi,
  auth: authApi,
  user: userApi,
})

declare global {
  interface Window {
    hubstore: {
      db: typeof dbApi
      auth: typeof authApi
      user: typeof userApi
    }
  }
}
