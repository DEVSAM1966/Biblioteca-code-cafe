import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function getPublisherById(id: number) {
  return prisma.publisher.findUnique({
    where: { id },
  });
}