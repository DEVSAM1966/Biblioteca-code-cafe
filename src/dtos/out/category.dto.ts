import { IsNumber, IsString, IsOptional} from "class-validator";

export class CategoryOutDto {
    @IsNumber()
    categoryId: number;

    @IsString()
    nameCategory: string;

    @IsOptional()
    @IsString()
    subtopicCategory?: string | null;
}