import { ipcMain } from "electron"
import { prisma } from "../database.js"

// 🔹 Récupérer toutes les franchises avec leurs sites
ipcMain.handle("db:getFranchises", async () => {
  return prisma.franchise.findMany({
    include: {
      sites: true
    }
  })
})

// 🔹 Créer une franchise
ipcMain.handle("db:createFranchise", async (_event, data) => {
  return prisma.franchise.create({ data })
})

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
