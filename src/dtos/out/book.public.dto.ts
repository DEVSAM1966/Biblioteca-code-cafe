import { IsString, Length, IsOptional } from 'class-validator'

export class BookPublicDto {
  @IsString()
  @Length(10, 13)
  isbn: string

  @IsString()
  title: string

  @IsOptional()
  @IsString()
  language?: string | null

  @IsString()
  @IsOptional()
  bookCover?: string | null

  @IsOptional()
  @IsString()
  nameAuthor?: string | null

  @IsOptional()
  @IsString()
  nameCategory?: string | null

  @IsOptional()
  @IsString()
  subtopicCategory?: string | null

  constructor(data: {
    isbn: string
    title: string
    language?: string | null
    bookCover?: string | null
    nameAuthor?: string | null
    nameCategory?: string | null
    subtopicCategory?: string | null
  }) {
    this.isbn = data.isbn
    this.title = data.title
    this.language = data.language ?? null
    this.bookCover = data.bookCover ?? null
    this.nameAuthor = data.nameAuthor ?? null
    this.nameCategory = data.nameCategory ?? null
    this.subtopicCategory = data.subtopicCategory ?? null
  }
}
