import { ipcMain } from "electron"
import { prisma } from "../database.js"

export function registerDbHandlers() {

  // ========================
  // FRANCHISES
  // ========================

  ipcMain.handle("franchise:getAll", async () => {
    try {
      const data = await prisma.franchise.findMany({
        include: { sites: true }
      })

      return { success: true, data }
    } catch (error) {
      return { success: false, error: String(error) }
    }
  })

  ipcMain.handle("franchise:create", async (_event, payload: { name: string }) => {
    try {
      const data = await prisma.franchise.create({
        data: payload
      })

      return { success: true, data }
    } catch (error) {
      return { success: false, error: String(error) }
    }
  })

}

// 🔹 Récupérer tous les sites
ipcMain.handle("db:getSites", async () => {
  return prisma.site.findMany({
    include: {
      franchise: true
    }
  })
})

// 🔹 Créer un site
ipcMain.handle("db:createSite", async (_event, data) => {
  return prisma.site.create({ data })
})

// 🔹 Récupérer les interventions
ipcMain.handle("db:getInterventions", async () => {
  return prisma.intervention.findMany({
    include: {
      site: {
        include: {
          franchise: true
        }
      }
    }
  })
})

// 🔹 Créer une intervention
ipcMain.handle("db:createIntervention", async (_event, data) => {
  return prisma.intervention.create({ data })
})
