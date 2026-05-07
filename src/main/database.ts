import pkg from "@prisma/client"
const { PrismaClient } = pkg

import path from "path"
import { app } from "electron"
import fs from "fs"
import bcrypt from "bcryptjs"

let prisma: any = null

export async function initDatabase() {
  try {
    await app.whenReady()

    const userDataPath = app.getPath("userData")
    const dbPath = path.join(userDataPath, "dev.db")

    // ========================
    // PROD
    // ========================
    if (app.isPackaged) {
      const sourceDb = path.join(process.resourcesPath, "dev.db")

      if (!fs.existsSync(dbPath)) {
        fs.copyFileSync(sourceDb, dbPath)
        console.log("✅ DB copiée :", dbPath)
      }

      // ✅ SEUL TRUC IMPORTANT
      process.env.PRISMA_CLIENT_ENGINE_TYPE = "binary"

      process.env.PRISMA_QUERY_ENGINE_LIBRARY = path.join(
        process.resourcesPath,
        "app.asar.unpacked",
        "node_modules",
        "@prisma",
        "engines",
        "query_engine-windows.dll.node"
      )
    }

    prisma = new PrismaClient({
      datasources: {
        db: {
          url: `file:${dbPath}`
        }
      }
    })

    await prisma.$connect()
    console.log("✅ Prisma connecté")

    const existing = await prisma.user.findUnique({
      where: { username: "admin" }
    })

    if (!existing) {
      const hashedPassword = await bcrypt.hash("admin123", 10)

      await prisma.user.create({
        data: {
          username: "admin",
          password: hashedPassword,
          role: "ADMIN"
        }
      })

      console.log("✅ Admin créé")
    }

  } catch (e) {
    console.error("❌ DB init error", e)
  }
}

export function getPrisma() {
  if (!prisma) throw new Error("Prisma non initialisé")
  return prisma
}