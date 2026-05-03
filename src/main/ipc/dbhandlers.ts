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

  ipcMain.handle("franchise:create", async (_event, payload: { name: string, code: string }) => {
    try {
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
  ipcMain.handle("db:getSites", async () => {
    return prisma.site.findMany({
      include: { franchise: true }
    })
  })

  ipcMain.handle("db:createSite", async (_event, data) => {
    return prisma.site.create({ data })
  })

  // ========================
  // INTERVENTIONS
  // ========================
  ipcMain.handle("db:getInterventions", async () => {
    return prisma.intervention.findMany({
      include: {
        site: {
          include: { franchise: true }
        }
      }
    })
  })

  ipcMain.handle("db:createIntervention", async (_event, data) => {
    const { siteId } = data

    // 1) Récupérer le site + franchise
    const site = await prisma.site.findUnique({
      where: { id: siteId },
      include: { franchise: true }
    })

    if (!site) throw new Error("Site introuvable")

    // 2) Trouver le dernier ticket de la franchise
    const last = await prisma.intervention.findFirst({
      where: { site: { franchiseId: site.franchiseId } },
      orderBy: { ticketNumber: "desc" }
    })

    const nextNumber = last ? last.ticketNumber + 1 : 1

    // 3) Générer le code final (ex: MCD00001)
    const ticketCode = `${site.franchise.code}${String(nextNumber).padStart(5, "0")}`

    // 4) Créer l’intervention
    return prisma.intervention.create({
      data: {
        ...data,
        ticketNumber: nextNumber,
        ticketCode
      }
    })
  })
}
