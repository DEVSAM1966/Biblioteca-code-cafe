import { Prisma } from "@prisma/client";
import { prisma } from "../configuration/prisma.configuration";

export class UsersRepository {
  static async create(data: Prisma.UserCreateInput) {
    try {
      return await prisma.user.create({ data });
    } catch (error) {
      throw error;
    }
  }

  static async existsBy(field: "email" | "dni" | "phone", value: string) {
    const where: Prisma.UserWhereUniqueInput =
      field === "email"
        ? { email: value }
        : field === "dni"
        ? { dni: value }
        : { phone: value };

    const user = await prisma.user.findUnique({
      where,
      select: { userId: true },
    });

    return Boolean(user);
  }
}
