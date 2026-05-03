import { app, BrowserWindow } from "electron";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Charger les handlers IPC
const dbHandlersPath = app.isPackaged
  ? path.join(__dirname, "../ipc/dbhandlers.js")
  : path.join(__dirname, "ipc/dbhandlers.js");

await import(pathToFileURL(dbHandlersPath).href);

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: app.isPackaged
        ? path.join(__dirname, "../preload/preload.js") // PROD
        : path.join(__dirname, "../preload/preload.js"), // DEV
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  if (process.env.VITE_DEV_SERVER_URL) {
    win.loadURL(process.env.VITE_DEV_SERVER_URL);
  } else {
    win.loadFile(path.join(__dirname, "../renderer/index.html"));
  }
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
