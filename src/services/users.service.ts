import { NotFoundError } from "../models/errors/not-found.error";
import { UserOutDTO } from "../dtos/out/user.dto";
import { UsersRepository } from "../repositories/users.repository";

export class UsersService {
  static async getById(id: number): Promise<UserOutDTO> {
    const user = await UsersRepository.getById(id);

    if (!user) {
      throw new NotFoundError(`User with id ${id} not found`);
    }

    return {
      fullname: user.fullname,
      registrationDate: user.registrationDate.toISOString(),
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
      role: user.role,
      userId: user.userId,
    }));
  }

  static async getByName(name: string): Promise<UserOutDTO[]> {
    const users = await UsersRepository.getByName(name);

    if (!users || users.length === 0) {
      throw new NotFoundError(`No user found with name: ${name}`);
    }

    return users.map((user) => ({
      fullname: user.fullname,
      registrationDate: user.registrationDate.toISOString(),
      role: user.role,
      userId: user.userId,
    }));
  }
}
