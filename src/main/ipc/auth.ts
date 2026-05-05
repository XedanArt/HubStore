import bcrypt from "bcryptjs"
import { prisma } from "../database"

export async function login(username: string, password: string) {
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