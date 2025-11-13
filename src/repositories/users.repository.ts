import { Prisma, type User } from '@prisma/client'
import { prisma } from '../configuration/prisma.configuration'

export class UsersRepository {
  static async create(data: Prisma.UserCreateInput) {
    try {
      return await prisma.user.create({ data })
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new Error('A user with this email already exists')
        }
      }
      throw error
    }
  }

  static async existsBy(field: 'email' | 'dni' | 'phone', value: string) {
    const where: Prisma.UserWhereUniqueInput =
      field === 'email' ? { email: value } : field === 'dni' ? { dni: value } : { phone: value }

    const user = await prisma.user.findUnique({
      where,
      select: { userId: true },
    })

    return Boolean(user)
  }

  static async getByEmail(email: string) {
    return await prisma.user.findUnique({ where: { email } })
  }

  static async getById(id: number): Promise<User | null> {
    return await prisma.user.findUnique({ where: { userId: id } })
  }

  static async getAll(): Promise<User[]> {
    return await prisma.user.findMany()
  }

  static async getByName(name: string): Promise<User[]> {
    return await prisma.user.findMany({
      where: {
        fullname: {
          contains: name,
        },
      },
    })
  }

  static async delete(id: number): Promise<User> {
    return await prisma.user.delete({ where: { userId: id } })
  }

  static async update(id: number, data: Prisma.UserUpdateInput): Promise<User> {
    return await prisma.user.update({
      where: { userId: id },
      data,
    })
  }

  static async deleteLogic(id: number): Promise<User> {
    return await prisma.user.update({
      where: { userId: id },
      data: { userDrop: true },
    })
  }
}
