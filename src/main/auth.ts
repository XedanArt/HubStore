import bcrypt from "bcryptjs"
import { getPrisma } from "./database.js"

export async function login(username: string, password: string) {
  const prisma = getPrisma()

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
