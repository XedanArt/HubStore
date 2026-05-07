import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"
import path from "path"
import os from "os"
import fs from "fs"

// ========================
// ENV (DEV vs PROD)
// ========================
const isProd = process.env.NODE_ENV === "production"

// DEV → prisma/dev.db
// PROD → AppData
const dbPath = isProd
  ? path.join(os.homedir(), "AppData", "Roaming", "HubStore", "dev.db")
  : path.join(process.cwd(), "prisma", "dev.db")

// ========================
// CREATE DIR SI NÉCESSAIRE
// ========================
const dir = path.dirname(dbPath)
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true })
}

// ========================
// PRISMA
// ========================
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: `file:${dbPath}`
    }
  }
})

// ========================
// SCRIPT
// ========================
async function main() {
  console.log("📁 DB utilisée :", dbPath)

  const username = "admin"
  const password = "admin123"

  const existing = await prisma.user.findUnique({
    where: { username }
  })

  if (existing) {
    console.log("⚠️ Admin déjà existant")
    return
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  await prisma.user.create({
    data: {
      username,
      password: hashedPassword,
      role: "ADMIN"
    }
  })

  console.log("✅ Admin créé")
}

main()
  .catch((err) => {
    console.error("❌ Erreur :", err)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })