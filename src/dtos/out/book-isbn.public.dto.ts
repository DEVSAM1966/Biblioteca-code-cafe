import { IsNumber, IsString, Length, IsISO8601, IsOptional } from 'class-validator'

export class BookPublicIsbnDto {
  @IsString()
  @Length(10, 13)
  isbn: string

  @IsString()
  title: string

  @IsNumber()
  @IsOptional()
  pages?: number | null

  @IsString()
  @IsOptional()
  summary?: string | null

  @IsISO8601()
  @IsOptional()
  editionDate?: string | null

  @IsString()
  @IsOptional()
  bookCover?: string | null

  @IsString()
  @IsOptional()
  language?: string | null

  @IsOptional()
  @IsString()
  nameAuthor?: string | null

  @IsString()
  @IsOptional()
  authors?: string | null

  @IsOptional()
  @IsString()
  nameCategory?: string | null

  @IsOptional()
  @IsString()
  subtopicCategory?: string | null

  @IsOptional()
  @IsString()
  namePublisher?: string | null

  constructor(data: {
    isbn: string
    title: string
    language?: string | null
    pages?: number | null
    summary?: string | null
    editionDate?: string | null
    bookCover?: string | null
    nameAuthor?: string | null
    authors?: string | null
    nameCategory?: string | null
    subtopicCategory?: string | null
    namePublisher?: string | null
  }) {
    this.isbn = data.isbn
    this.title = data.title
    this.language = data.language ?? null
    this.pages = data.pages ?? null
    this.summary = data.summary ?? null
    this.editionDate = data.editionDate ?? null
    this.bookCover = data.bookCover ?? null
    this.nameAuthor = data.nameAuthor ?? null
    this.authors = data.authors ?? null
    this.nameCategory = data.nameCategory ?? null
    this.subtopicCategory = data.subtopicCategory ?? null
    this.namePublisher = data.namePublisher ?? null
  }
}
