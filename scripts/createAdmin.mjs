import { PrismaClient } from "@prisma/client"
import dotenv from "dotenv"
import bcrypt from "bcryptjs"

dotenv.config()

if (!process.env.DATABASE_URL) {
  console.error("❌ DATABASE_URL manquant dans .env")
  process.exit(1)
}

const prisma = new PrismaClient({
  datasources: {
    db: { url: process.env.DATABASE_URL }
  }
})

async function main() {
  console.log("📁 DB utilisée :", process.env.DATABASE_URL)

  const username = "admin"
  const password = "admin123"

  const existing = await prisma.user.findUnique({ where: { username } })

  if (existing) {
    console.log("⚠️ Admin déjà existant")
    return
  }

  const hashed = await bcrypt.hash(password, 10)

  await prisma.user.create({
    data: {
      username,
      password: hashed,
      role: "ADMIN"
    }
  })

  console.log("✅ Admin créé")
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
