import { app, BrowserWindow } from "electron"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { registerDbHandlers } from "./ipc/dbhandlers.js"
import { registerAuthHandlers } from "./ipc/auth.js"
import { initDatabase } from "./database.js"
import { registerFranchiseHandlers } from "./ipc/franchise"

app.whenReady().then(() => {
  initDatabase()

  registerDbHandlers()
  registerAuthHandlers()
  registerFranchiseHandlers()   // ← AJOUT ICI

  createWindow()
})

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 900,
    minHeight: 600,
    webPreferences: {
      preload: path.resolve(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  })

  if (process.env.VITE_DEV_SERVER_URL) {
    win.loadURL(process.env.VITE_DEV_SERVER_URL)
  } else {
    win.loadFile(path.join(__dirname, "renderer/index.html"))
  }
}

app.whenReady().then(async () => {
  await initDatabase()        // ← INDISPENSABLE
  registerDbHandlers()
  registerAuthHandlers()
  createWindow()

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit()
})
