import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function getUserByName(name: string) {
  return prisma.user.findUnique({
    where: { name },
  });
}