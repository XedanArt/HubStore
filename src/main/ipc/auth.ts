import { ipcMain } from "electron"
import { getPrisma } from "../database.js"
import bcrypt from "bcryptjs"

export function registerAuthHandlers() {
  const prisma = getPrisma()

  ipcMain.handle("auth:login", async (_event, { username, password }) => {
    try {
      const user = await prisma.user.findUnique({
        where: { username },
      })

      if (!user) {
        return { success: false, error: "Identifiants incorrects" }
      }

      const match = await bcrypt.compare(password, user.password)

      if (!match) {
        return { success: false, error: "Identifiants incorrects" }
      }

      return { success: true, data: user }
    } catch (error) {
      return { success: false, error: String(error) }
    }
  })
}
