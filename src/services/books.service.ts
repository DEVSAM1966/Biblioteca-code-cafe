import type { Book } from '@prisma/client'
import type { CreateBookDto } from '../dtos/in/create-book.dto'
import { NotFoundError } from '../models/errors/not-found.error'
import { InternalServerError } from '../models/errors/internal-server.error'
import { BooksRepository } from '../repositories/books.repository'
import { AuthorsRepository } from '../repositories/authors.repository'
import { CategoryRepository } from '../repositories/categories.repository'
import { PublishersRepository } from '../repositories/publishers.repository'
import fs from 'node:fs/promises'
import { ConflictError } from '../models/errors/conflict.error'
import type { BookDto } from '../dtos/out/book.dto'
import type { UpdateBookDto } from '../dtos/in/update-book.dto'
import path from 'node:path'

export class BooksService {
  static generateSafeFilename(originalName: string, isbn: string): string {
    const ext = path.extname(originalName)
    const base = path.basename(originalName, ext)
    const safeBase = base.replace(/\s+/g, '-').replace(/[^\w-]/g, '')

    return `${isbn}_${safeBase}${ext}`
  }

  static async deleteBookIfExists(path: string | undefined | null): Promise<void> {
    if (!path) return
    try {
      await fs.unlink(path)
    } catch {
      console.warn(`Could not delete file ${path}`)
    }
  }

  static async getById(isbn: string): Promise<BookDto> {
    const book: Book | null = await BooksRepository.getById(isbn)

    if (!book) {
      throw new NotFoundError(`Book with isbn ${isbn} not found`)
    }

    const dto: BookDto = {
      isbn: book.isbn,
      title: book.title,
      summary: book.summary ?? null,
      pages: book.pages ?? null,
      editionDate: (book.editionDate as unknown as Date)?.toISOString() ?? null,
      bookCover: book.bookCover ?? null,
      bookFile: book.bookFile ?? null,
      language: book.language ?? null,
      authorId: book.authorId ?? null,
      authors: book.authors ?? null,
      publisherId: book.publisherId ?? null,
      categoryId: book.categoryId ?? null,
    }

    return dto
  }

  static async getByName(name: string): Promise<BookDto[]> {
    const books: Book[] = await BooksRepository.getByName(name)

    if (!books || books.length === 0) {
      throw new NotFoundError(`No book found with title: ${name}`)
    }

    return books.map((book) => ({
      isbn: book.isbn,
      title: book.title,
      summary: book.summary ?? null,
      pages: book.pages ?? null,
      editionDate: (book.editionDate as unknown as Date)?.toISOString() ?? null,
      bookCover: book.bookCover ?? null,
      bookFile: book.bookFile ?? null,
      language: book.language ?? null,
      authorId: book.authorId ?? null,
      authors: book.authors ?? null,
      publisherId: book.publisherId ?? null,
      categoryId: book.categoryId ?? null,
    }))
  }

  static async getAll(): Promise<BookDto[]> {
    const books: Book[] = await BooksRepository.getAll()

    if (!books.length) {
      throw new NotFoundError(`There are no records in Books`)
    }

    const dto: BookDto[] = books.map((book) => ({
      isbn: book.isbn,
      title: book.title,
      summary: book.summary ?? null,
      pages: book.pages ?? null,
      editionDate: (book.editionDate as unknown as Date)?.toISOString() ?? null,
      bookCover: book.bookCover ?? null,
      bookFile: book.bookFile ?? null,
      language: book.language ?? null,
      authorId: book.authorId ?? null,
      authors: book.authors ?? null,
      publisherId: book.publisherId ?? null,
      categoryId: book.categoryId ?? null,
    }))

    return dto
  }

  static async create(bookData: CreateBookDto): Promise<BookDto> {
    const existingBook = await BooksRepository.getById(bookData.isbn)

    if (existingBook) {
      throw new ConflictError(`Book with ISBN ${bookData.isbn} already exists`)
    }

    const existingAuthor = await AuthorsRepository.getById(bookData.authorId)

    if (!existingAuthor) {
      throw new NotFoundError(`Book Author with ID ${bookData.authorId} not found`)
    }

    const existingCategory = await CategoryRepository.getById(bookData.categoryId)

    if (!existingCategory) {
      throw new NotFoundError(`Book Category with ID ${bookData.categoryId} not found`)
    }

    const existingPublisher = await PublishersRepository.getById(bookData.publisherId)

    if (!existingPublisher) {
      throw new NotFoundError(`Book Publisher with ID ${bookData.publisherId} not found`)
    }

    try {
      const newBook: Book = await BooksRepository.create(bookData)

      const dto: BookDto = {
        isbn: newBook.isbn,
        title: newBook.title,
        summary: newBook.summary ?? null,
        pages: newBook.pages ?? null,
        editionDate: newBook.editionDate
          ? (newBook.editionDate as Date).toISOString().split('T')[0]
          : null,
        bookCover: newBook.bookCover ?? null,
        bookFile: newBook.bookFile ?? null,
        language: newBook.language ?? null,
        authorId: newBook.authorId ?? null,
        authors: newBook.authors ?? null,
        publisherId: newBook.publisherId ?? null,
        categoryId: newBook.categoryId ?? null,
      }

      return dto
    } catch (error) {
      throw new InternalServerError(
        `Failed to create book: ${error instanceof Error ? error.message : String(error)}`,
      )
    }
  }

  static async update(isbn: string, bookData: UpdateBookDto): Promise<BookDto> {
    const existing = await BooksRepository.getById(isbn)

    if (!existing) {
      throw new NotFoundError(`Book with isbn ${isbn} not found`)
    }

    if (bookData.authorId !== null && bookData.authorId !== undefined) {
      const existingAuthor = await AuthorsRepository.getById(bookData.authorId)

      if (!existingAuthor) {
        throw new NotFoundError(`Book Author with ID ${bookData.authorId} not found`)
      }
    }

    if (bookData.categoryId !== null && bookData.categoryId !== undefined) {
      const existingCategory = await CategoryRepository.getById(bookData.categoryId)

      if (!existingCategory) {
        throw new NotFoundError(`Book Category with ID ${bookData.categoryId} not found`)
      }
    }
    
    if (bookData.publisherId !== null && bookData.publisherId !== undefined) {
      const existingPublisher = await PublishersRepository.getById(bookData.publisherId)

      if (!existingPublisher) {
        throw new NotFoundError(`Book Publisher with ID ${bookData.publisherId} not found`)
      }
    }

    try {
      const updatedBook: Book = await BooksRepository.update(isbn, bookData)

      const dto: BookDto = {
        isbn: updatedBook.isbn,
        title: updatedBook.title,
        summary: updatedBook.summary ?? null,
        pages: updatedBook.pages ?? null,
        editionDate: updatedBook.editionDate
          ? (updatedBook.editionDate as Date).toISOString().split('T')[0]
          : null,
        bookCover: updatedBook.bookCover ?? null,
        bookFile: updatedBook.bookFile ?? null,
        language: updatedBook.language ?? null,
        authorId: updatedBook.authorId ?? null,
        authors: updatedBook.authors ?? null,
        publisherId: updatedBook.publisherId ?? null,
        categoryId: updatedBook.categoryId ?? null,
      }

      return dto
    } catch (error) {
      throw new InternalServerError(
        `Failed to create book: ${error instanceof Error ? error.message : String(error)}`,
      )
    }
  }

  static async updateFiles(
    isbn: string,
    files: Partial<UpdateBookDto> & {
      bookCoverBuffer?: Buffer
      bookFileBuffer?: Buffer
    },
  ): Promise<BookDto> {
    const book = await BooksRepository.getById(isbn)
    if (!book) {
      throw new NotFoundError(`Book with ISBN ${isbn} not found`)
    }

    await BooksService.deleteBookIfExists(book.bookCover)
    await BooksService.deleteBookIfExists(book.bookFile)

    let updatedBook: Book
    try {
      updatedBook = await BooksRepository.update(isbn, {
        bookCover: files.bookCover,
        bookFile: files.bookFile,
      })
    } catch (error) {
      throw new InternalServerError(
        `Failed to update book files: ${error instanceof Error ? error.message : String(error)}`,
      )
    }

    try {
      if (files.bookCover && files.bookCoverBuffer) {
        await fs.writeFile(files.bookCover, files.bookCoverBuffer)
      }
      if (files.bookFile && files.bookFileBuffer) {
        await fs.writeFile(files.bookFile, files.bookFileBuffer)
      }
    } catch (error) {
      console.warn(
        `Warning: Failed to write one or more files to disk: ${error instanceof Error ? error.message : String(error)}`,
      )
    }

    return {
      isbn: updatedBook.isbn,
      title: updatedBook.title,
      summary: updatedBook.summary ?? null,
      pages: updatedBook.pages ?? null,
      editionDate: updatedBook.editionDate ?? null,
      bookCover: updatedBook.bookCover ?? null,
      bookFile: updatedBook.bookFile ?? null,
      language: updatedBook.language ?? null,
      authorId: updatedBook.authorId ?? null,
      authors: updatedBook.authors ?? null,
      publisherId: updatedBook.publisherId ?? null,
      categoryId: updatedBook.categoryId ?? null,
    }
  }

  static async delete(isbn: string): Promise<boolean> {
    try {
      const book: Book | null = await BooksRepository.getById(isbn)

      if (!book) {
        throw new NotFoundError(`Book with isbn ${isbn} not found`)
      }

      const result = await BooksRepository.delete(isbn)

      if (result.count === 0) {
        throw new NotFoundError(`Book with isbn ${isbn} not found`)
      }

      await BooksService.deleteBookIfExists(book.bookCover)
      await BooksService.deleteBookIfExists(book.bookFile)

      return true
    } catch (error: any) {
      if (error instanceof NotFoundError) {
        throw error
      }
      throw new InternalServerError('Failed to delete book')
    }
  }
}
