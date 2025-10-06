import { IsNumber, IsString } from "class-validator";

export class AuthorOutDTO {
  @IsNumber()
  authorId: number;

  @IsString()
  nameAuthor: string;
}
