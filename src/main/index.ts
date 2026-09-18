import { app, BrowserWindow } from "electron"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { registerDbHandlers } from "./ipc/dbhandlers.js"
import { registerAuthHandlers } from "./ipc/auth.js"
import { initDatabase } from "./database.js"

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
      sandbox: true,
      webSecurity: true,
      devTools: true,
    },
  })

win.loadFile(path.join(__dirname, "renderer/index.html"))

}

async function bootstrap() {
  await initDatabase()

  registerDbHandlers()
  registerAuthHandlers()

  createWindow()

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
}

app.whenReady().then(bootstrap)

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit()
  }
})
