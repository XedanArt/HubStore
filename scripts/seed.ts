import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  const adminPassword = await bcrypt.hash("admin123", 10)
  const userPassword = await bcrypt.hash("user123", 10)

  await prisma.user.createMany({
    data: [
      {
        username: "admin",
        password: adminPassword,
        role: "ADMIN"
      },
      {
        username: "user",
        password: userPassword,
        role: "USER"
      }
    ]
  })

  console.log("✅ Users créés")
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect())