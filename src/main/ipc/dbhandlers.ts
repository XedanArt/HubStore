import { ipcMain } from 'electron'
import { prisma } from '../database'

ipcMain.handle('db:getFranchises', async () => {
  return prisma.franchise.findMany({
    include: {
      countries: {
        include: {
          sites: {
            include: {
              jobs: true
            }
          }
        }
      }
    }
  })
})

ipcMain.handle('db:createFranchise', async (_event, data) => {
  return prisma.franchise.create({ data })
})
