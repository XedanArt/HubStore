import { contextBridge, ipcRenderer } from "electron"

type IpcResponse<T> = {
  success: boolean
  data?: T
  error?: string
}

const databaseApi = {
  // FRANCHISES
  getFranchises: (): Promise<IpcResponse<any[]>> =>
    ipcRenderer.invoke("franchise:getAll"),

  createFranchise: (data: { name: string }): Promise<IpcResponse<any>> =>
    ipcRenderer.invoke("franchise:create", data),
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
