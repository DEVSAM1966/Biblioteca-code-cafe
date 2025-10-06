import { UserRole } from "@prisma/client";
import { IsEnum, IsISO8601, IsNumber, IsString } from "class-validator";

export class UserOutDTO {
  @IsNumber()
  userId: number;

  @IsISO8601()
  registrationDate: string;

  @IsEnum(UserRole)
  role: UserRole;

  @IsString()
  fullname: string;
}
