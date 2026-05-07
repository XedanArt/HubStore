import { ipcMain } from "electron"
import { getPrisma } from "../database.js"

export function registerDbHandlers() {

  // ========================
  // USERS
  // ========================
  ipcMain.removeHandler("user:getAll")
  ipcMain.handle("user:getAll", async () => {
    try {
      const prisma = getPrisma()

      const users = await prisma.user.findMany({
        select: {
          id: true,
          username: true,
          role: true
        }
      })

      return { success: true, data: users }

    } catch (error) {
      return { success: false, error: String(error) }
    }
  })

  ipcMain.removeHandler("user:create")
  ipcMain.handle("user:create", async (_event, { username, password, role }) => {
    try {
      const prisma = getPrisma()

      const existing = await prisma.user.findUnique({
        where: { username }
      })

      if (existing) {
        return { success: false, error: "Utilisateur déjà existant" }
      }

      const bcrypt = await import("bcryptjs")
      const hashedPassword = await bcrypt.hash(password, 10)

      const user = await prisma.user.create({
        data: {
          username,
          password: hashedPassword,
          role
        }
      })

      return { success: true, data: user }

    } catch (error) {
      return { success: false, error: String(error) }
    }
  })

  ipcMain.removeHandler("user:delete")
  ipcMain.handle("user:delete", async (_event, id: number) => {
    try {
      const prisma = getPrisma()

      const user = await prisma.user.findUnique({
        where: { id }
      })

      if (!user) {
        return { success: false, error: "Utilisateur introuvable" }
      }

      if (user.role === "ADMIN") {
        const adminCount = await prisma.user.count({
          where: { role: "ADMIN" }
        })

        if (adminCount <= 1) {
          return {
            success: false,
            error: "Impossible de supprimer le dernier admin"
          }
        }
      }

      await prisma.user.delete({
        where: { id }
      })

      return { success: true }

    } catch (error) {
      return { success: false, error: String(error) }
    }
  })

  // ========================
  // FRANCHISES
  // ========================
  ipcMain.removeHandler("franchise:getAll")
  ipcMain.handle("franchise:getAll", async () => {
    try {
      const prisma = getPrisma()

      const data = await prisma.franchise.findMany({
        include: { sites: true }
      })

      return { success: true, data }

    } catch (error) {
      return { success: false, error: String(error) }
    }
  })

  ipcMain.removeHandler("franchise:create")
  ipcMain.handle("franchise:create", async (_event, payload) => {
    try {
      const prisma = getPrisma()

      const data = await prisma.franchise.create({
        data: payload
      })

      return { success: true, data }

    } catch (error) {
      return { success: false, error: String(error) }
    }
  })

  // ========================
  // SITES
  // ========================
  ipcMain.removeHandler("db:getSites")
  ipcMain.handle("db:getSites", async () => {
    const prisma = getPrisma()

    return prisma.site.findMany({
      include: { franchise: true }
    })
  })

  ipcMain.removeHandler("db:createSite")
  ipcMain.handle("db:createSite", async (_event, data) => {
    const prisma = getPrisma()
    return prisma.site.create({ data })
  })

  // ========================
  // INTERVENTIONS
  // ========================
  ipcMain.removeHandler("db:getInterventions")
  ipcMain.handle("db:getInterventions", async () => {
    const prisma = getPrisma()

    return prisma.intervention.findMany({
      include: {
        site: {
          include: { franchise: true }
        },
        createdBy: true
      },
      orderBy: {
        date: "desc"
      }
    })
  })

  ipcMain.removeHandler("db:createIntervention")
  ipcMain.handle("db:createIntervention", async (_event, data) => {
    try {
      const prisma = getPrisma()

      const { siteId, createdById } = data

      if (!siteId) {
        throw new Error("Site manquant")
      }

      const site = await prisma.site.findUnique({
        where: { id: siteId },
        include: { franchise: true }
      })

      if (!site) {
        throw new Error("Site introuvable")
      }

      const last = await prisma.intervention.findFirst({
        where: {
          site: {
            franchiseId: site.franchiseId
          }
        },
        orderBy: {
          ticketNumber: "desc"
        }
      })

      const nextNumber = last ? last.ticketNumber + 1 : 1

      const ticketCode = `${site.franchise.code}${String(nextNumber).padStart(5, "0")}`

      const intervention = await prisma.intervention.create({
        data: {
          ...data,
          createdById: createdById ?? null,
          ticketNumber: nextNumber,
          ticketCode
        }
      })

      return intervention

    } catch (error) {
      console.error("CREATE INTERVENTION ERROR:", error)
      throw error
    }
  })
}
