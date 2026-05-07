import { ipcMain } from "electron"
import { getPrisma } from "../database"

export function registerFranchiseHandlers() {
  ipcMain.handle("franchise:getAll", async () => {
    const prisma = getPrisma()

    const data = await prisma.franchise.findMany({
      include: {
        sites: true
      }
    })

    return { success: true, data }
  })

  ipcMain.handle("franchise:create", async (_, payload) => {
    const prisma = getPrisma()

    const franchise = await prisma.franchise.create({
      data: payload
    })

    return { success: true, data: franchise }
  })
}
