import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('db', {
  getFranchises: () => ipcRenderer.invoke('db:getFranchises'),
  createFranchise: (data) => ipcRenderer.invoke('db:createFranchise', data)
})
