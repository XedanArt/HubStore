import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
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
  .catch(console.error)
  .finally(() => prisma.$disconnect())