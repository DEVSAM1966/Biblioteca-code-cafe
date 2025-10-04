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

  static async exists(data: Prisma.UserWhereUniqueInput) {
    const user = await prisma.user.findUnique({
      where: { email: data.email },
      select: { user_id: true },
    });

    return Boolean(user);
  }
}
