import { ipcMain } from "electron"
import { getPrisma } from "../database.js"

type IpcResponse<T> = {
  success: boolean
  data?: T
  error?: string
}

function ok<T>(data: T): IpcResponse<T> {
  return { success: true, data }
}

function fail(error: unknown): IpcResponse<never> {
  return { success: false, error: String(error) }
}

export function registerDbHandlers() {
  const prisma = getPrisma()

  // ========================
  // USERS
  // ========================
  ipcMain.handle("user:getAll", async () => {
    try {
      const users = await prisma.user.findMany({
        select: {
          id: true,
          username: true,
          role: true,
        },
      })
      return ok(users)
    } catch (error) {
      return fail(error)
    }
  })

  ipcMain.handle("user:create", async (_event, payload) => {
    try {
      const { username, password, role } = payload as {
        username: string
        password: string
        role: "ADMIN" | "USER"
      }

      const existing = await prisma.user.findUnique({
        where: { username },
      })

      if (existing) {
        return fail("Utilisateur déjà existant")
      }

      const bcrypt = await import("bcryptjs")
      const hashedPassword = await bcrypt.hash(password, 10)

      const user = await prisma.user.create({
        data: {
          username,
          password: hashedPassword,
          role,
        },
      })

      return ok(user)
    } catch (error) {
      return fail(error)
    }
  })

  ipcMain.handle("user:delete", async (_event, id: number) => {
    try {
      const user = await prisma.user.findUnique({
        where: { id },
      })

      if (!user) {
        return fail("Utilisateur introuvable")
      }

      if (user.role === "ADMIN") {
        const adminCount = await prisma.user.count({
          where: { role: "ADMIN" },
        })

        if (adminCount <= 1) {
          return fail("Impossible de supprimer le dernier admin")
        }
      }

      await prisma.user.delete({
        where: { id },
      })

      return ok<void>(undefined)
    } catch (error) {
      return fail(error)
    }
  })

  // ========================
  // FRANCHISES
  // ========================
  ipcMain.handle("franchise:getAll", async () => {
    try {
      const data = await prisma.franchise.findMany({
        include: { sites: true },
      })
      return ok(data)
    } catch (error) {
      return fail(error)
    }
  })

  ipcMain.handle("franchise:create", async (_event, payload) => {
    try {
      const data = await prisma.franchise.create({
        data: payload,
      })
      return ok(data)
    } catch (error) {
      return fail(error)
    }
  })

  // ========================
  // SITES
  // ========================
  ipcMain.handle("site:getAll", async () => {
    try {
      const sites = await prisma.site.findMany({
        include: { franchise: true },
      })
      return ok(sites)
    } catch (error) {
      return fail(error)
    }
  })

  ipcMain.handle("site:create", async (_event, data) => {
    try {
      const site = await prisma.site.create({ data })
      return ok(site)
    } catch (error) {
      return fail(error)
    }
  })

  // ========================
  // INTERVENTIONS
  // ========================
  ipcMain.handle("intervention:getAll", async () => {
    try {
      const interventions = await prisma.intervention.findMany({
        include: {
          site: {
            include: { franchise: true },
          },
          createdBy: true,
        },
        orderBy: {
          date: "desc",
        },
      })
      return ok(interventions)
    } catch (error) {
      return fail(error)
    }
  })

  ipcMain.handle("intervention:create", async (_event, data) => {
    try {
      const { siteId, createdById } = data as {
        siteId: number
        createdById?: number | null
      }

      if (!siteId) {
        return fail("Site manquant")
      }

      const site = await prisma.site.findUnique({
        where: { id: siteId },
        include: { franchise: true },
      })

      if (!site) {
        return fail("Site introuvable")
      }

      const last = await prisma.intervention.findFirst({
        where: {
          site: {
            franchiseId: site.franchiseId,
          },
        },
        orderBy: {
          ticketNumber: "desc",
        },
      })

      const nextNumber = last ? last.ticketNumber + 1 : 1
      const ticketCode = `${site.franchise.code}${String(nextNumber).padStart(5, "0")}`

      const intervention = await prisma.intervention.create({
        data: {
          ...data,
          createdById: createdById ?? null,
          ticketNumber: nextNumber,
          ticketCode,
        },
      })

      return ok(intervention)
    } catch (error) {
      console.error("CREATE INTERVENTION ERROR:", error)
      return fail(error)
    }
  })

  ipcMain.handle("intervention:update", async (_event, payload) => {
    try {
      const { id, data } = payload as { id: number; data: any }

      const updated = await prisma.intervention.update({
        where: { id },
        data,
      })

      return ok(updated)
    } catch (error) {
      console.error("UPDATE INTERVENTION ERROR:", error)
      return fail(error)
    }
  })
}
