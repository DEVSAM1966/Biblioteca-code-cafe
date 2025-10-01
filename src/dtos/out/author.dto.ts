import { IsNumber, IsString } from "class-validator";

export class AuthorOutDTO {
  @IsNumber()
  author_id: number;

  @IsString()
  name_author: string;
}
