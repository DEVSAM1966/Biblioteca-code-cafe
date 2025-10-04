import { User } from "@prisma/client";

export class SanitizedUser {
  userId: number;
  registrationDate: string;
  role: string;
  fullname: string;

  constructor(user: User) {
    this.userId = user.user_id;
    this.registrationDate = user.registration_date.toISOString();
    this.role = user.role;
    this.fullname = user.fullname;
  }
}
