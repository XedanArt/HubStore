import { contextBridge, ipcRenderer } from "electron"

// API exposée au renderer
const databaseApi = {
  // --- FRANCHISES ---
  getFranchises: () => ipcRenderer.invoke("db:getFranchises"),
  createFranchise: (data) => ipcRenderer.invoke("db:createFranchise", data),

  // --- SITES ---
  getSites: () => ipcRenderer.invoke("db:getSites"),
  createSite: (data) => ipcRenderer.invoke("db:createSite", data),

  // --- INTERVENTIONS ---
  getInterventions: () => ipcRenderer.invoke("db:getInterventions"),
  createIntervention: (data) => ipcRenderer.invoke("db:createIntervention", data),
}

// Expose dans window.api.db
contextBridge.exposeInMainWorld("api", {
  db: databaseApi
})

// Types TS globaux
declare global {
  interface Window {
    api: {
      db: typeof databaseApi
    }
  }
}
