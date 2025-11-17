import { IsString, Matches } from "class-validator";
import { Type } from "class-transformer";

export class BookNameDto {
    @Type(() => String)
    @IsString({ message: 'Book title must be a string' })
    @Matches(/^[\p{L}\d\s-]+$/u, {
        message: 'Book title can only contain letters, numbers, spaces, and hyphens',
    })
    name: string;
}