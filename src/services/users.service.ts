import { NotFoundError } from "../models/errors/not-found.error";
import { ConflictError } from "../models/errors/conflict.error";
import { UserOutDTO, UserAllOutDTO } from "../dtos/out/user.dto";
import { UsersRepository } from "../repositories/users.repository";
import { InternalServerError } from "../models/errors/internal-server.error";
import { CreateUserDto } from "../dtos/in/create-user.dto";
import { User } from "@prisma/client";
import { Prisma } from "@prisma/client";

export class UsersService {
  static async getById(id: number): Promise<UserAllOutDTO> {
    const user = await UsersRepository.getById(id);

    if (!user) {
      throw new NotFoundError(`User with id ${id} not found`);
    }

    return {
      fullname: user.fullname,
      dni: user.dni,
      address: user.address,
      city: user.city,
      province: user.province,
      postalCode: user.postalCode,
      country: user.country,
      phone: user.phone,
      email: user.email,
      registrationDate: user.registrationDate.toISOString(),
      userDrop: user.userDrop,
      daysDisciplinary: user.daysDisciplinary,
      role: user.role,
      userId: user.userId,
    };
  }

  static async getAll(): Promise<UserOutDTO[]> {
    const users = await UsersRepository.getAll();

    if (!users || users.length === 0) {
      throw new NotFoundError(`There are no records in Users`);
    }

    return users.map((user) => ({
      fullname: user.fullname,
      registrationDate: user.registrationDate.toISOString(),
      userDrop: user.userDrop,
      role: user.role,
      userId: user.userId,
    }));
  }

  static async getByName(name: string): Promise<UserAllOutDTO[]> {
    const users = await UsersRepository.getByName(name);

    if (!users || users.length === 0) {
      throw new NotFoundError(`No user found with name: ${name}`);
    }

    return users.map((user) => ({
      fullname: user.fullname,
      dni: user.dni,
      address: user.address,
      city: user.city,
      province: user.province,
      postalCode: user.postalCode,
      country: user.country,
      phone: user.phone,
      email: user.email,
      registrationDate: user.registrationDate.toISOString(),
      userDrop: user.userDrop,
      daysDisciplinary: user.daysDisciplinary,
      role: user.role,
      userId: user.userId,
    }));
  }

  static async delete(id: number): Promise<boolean> {
    try {
      await UsersRepository.delete(id);

      return true;
    } catch (error: any) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        switch (error.code) {
          case "P2025":
            throw new NotFoundError(`User with id ${id} not found`);
          case "P2003":
            throw new ConflictError(`Cannot delete user with id ${id} due to existing related records`);
        }
      }
      throw new InternalServerError("Failed to delete user");
    }
  }

  static async create(data: CreateUserDto): Promise<UserAllOutDTO> {
    try {
      const newUser: User = await UsersRepository.create(data);

      const dto: UserAllOutDTO = {
        fullname: newUser.fullname,
        dni: newUser.dni,
        address: newUser.address,
        city: newUser.city,
        province: newUser.province,
        postalCode: newUser.postalCode,
        country: newUser.country,
        phone: newUser.phone,
        email: newUser.email,
        registrationDate: newUser.registrationDate.toISOString(),
        userDrop: newUser.userDrop,
        daysDisciplinary: newUser.daysDisciplinary,
        role: newUser.role,
        userId: newUser.userId,
      }

      return dto;
    } catch (error) {
      throw new InternalServerError("Failed to create user");
    }
  }
}
