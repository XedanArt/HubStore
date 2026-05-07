import { ipcMain } from "electron"
import { login } from "../auth.js"

export function registerAuthHandlers() {
  ipcMain.removeHandler("auth:login")

  ipcMain.handle("auth:login", async (_, data) => {
    const { username, password } = data
    const user = await login(username, password)

    if (!user) {
      return { success: false, error: "Identifiants incorrects" }
    }

    return { success: true, data: user }
  })
}
