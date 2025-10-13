import { IsNumber, IsString, IsOptional} from "class-validator";

export class CreateCategoryDto {

    @IsString()
    nameCategory: string;

    @IsOptional()
    @IsString()
    subtopicCategory?: string | null;
}

export class UpdateCategoryDto {
  @IsOptional()
  @IsString()
  nameCategory?: string;

  @IsOptional()
  @IsString()
  subtopicCategory?: string | null;
}