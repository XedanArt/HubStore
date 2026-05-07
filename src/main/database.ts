import { PrismaClient } from "@prisma/client"

let prisma: PrismaClient | null = null

export async function initDatabase() {
  // Prisma utilise DATABASE_URL défini dans .env
  prisma = new PrismaClient()

  await prisma.$connect()
  console.log("✅ Prisma connecté (DEV)")

  // Pas de création auto d'admin ici
}

export function getPrisma() {
  if (!prisma) throw new Error("Prisma non initialisé")
  return prisma
}
