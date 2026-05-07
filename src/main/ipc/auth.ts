import bcrypt from "bcryptjs"
import { getPrisma } from "../database"

export async function login(username: string, password: string) {
  const prisma = getPrisma()

  if (!prisma) throw new Error("Prisma non initialisé")

  const user = await prisma.user.findUnique({
    where: { username }
  })

  if (!user) return null

  const valid = await bcrypt.compare(password, user.password)

  if (!valid) return null

  return {
    id: user.id,
    username: user.username,
    role: user.role
  }
}