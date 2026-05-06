import { PrismaClient } from "@prisma/client"
import path from "path"
import { app } from "electron"
import fs from "fs"

// ========================
// DB PATH
// ========================
const userDataPath = app.getPath("userData")
const dbPath = path.join(userDataPath, "dev.db")

// ========================
// COPY DB IF NOT EXISTS (PROD)
// ========================
if (app.isPackaged) {
  const sourceDb = path.join(process.resourcesPath, "dev.db")

  if (!fs.existsSync(dbPath)) {
    fs.copyFileSync(sourceDb, dbPath)
  }
}

// ========================
// PRISMA CLIENT
// ========================
export const prisma = new PrismaClient({
  datasources: {
    db: {
      url: `file:${dbPath}`
    }
  }
})