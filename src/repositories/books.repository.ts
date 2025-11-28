import type { Book } from '@prisma/client'
import { prisma } from '../configuration/prisma.configuration'
import type { CreateBookDto } from '../dtos/in/create-book.dto'
import type { UpdateBookDto } from '../dtos/in/update-book.dto'

export class BooksRepository {
  static async getById(isbn: string): Promise<Book | null> {
    return await prisma.book.findUnique({ where: { isbn: isbn } })
  }

  static async getByName(name: string): Promise<Book[]> {
    return await prisma.book.findMany({
      where: {
        title: {
          contains: name,
        },
      },
    })
  }

  static async getAll(): Promise<Book[]> {
    return await prisma.book.findMany()
  }

  static async create(bookData: CreateBookDto): Promise<Book> {
    return await prisma.book.create({
      data: {
        isbn: bookData.isbn,
        title: bookData.title,
        summary: bookData.summary,
        pages: bookData.pages,
        editionDate: bookData.editionDate ? new Date(bookData.editionDate) : undefined,
        language: bookData.language,
        authors: bookData.authors,
        author: { connect: { authorId: bookData.authorId } },
        publisher: { connect: { publisherId: bookData.publisherId } },
        category: { connect: { categoryId: bookData.categoryId } },
      },
    })
  }

  static async update(isbn: string, bookData: UpdateBookDto): Promise<Book> {
    return await prisma.book.update({
      where: { isbn },
      data: {
        title: bookData.title,
        pages: bookData.pages,
        summary: bookData.summary,
        editionDate: bookData.editionDate ? new Date(bookData.editionDate) : undefined,
        bookCover: bookData.bookCover,
        bookFile: bookData.bookFile,
        language: bookData.language,
        authors: bookData.authors,
        author: bookData.authorId ? { connect: { authorId: bookData.authorId } } : undefined,
        publisher: bookData.publisherId
          ? { connect: { publisherId: bookData.publisherId } }
          : undefined,
        category: bookData.categoryId
          ? { connect: { categoryId: bookData.categoryId } }
          : undefined,
      },
    })
  }

  static async delete(id: string): Promise<{ count: number }> {
    return await prisma.book.deleteMany({ where: { isbn: id } })
  }

  static async getPublicBooks(
    page: number = 1,
    limit: number = 10,
    filters?: { authorId?: number; categoryId?: number },
  ) {
    const skip = (page - 1) * limit

    return prisma.book.findMany({
      skip,
      take: limit,
      where: {
        ...(filters?.authorId ? { authorId: filters.authorId } : {}),
        ...(filters?.categoryId ? { categoryId: filters.categoryId } : {}),
      },
      select: {
        isbn: true,
        title: true,
        language: true,
        bookCover: true,
        author: {
          select: {
            nameAuthor: true,
          },
        },
        category: {
          select: {
            nameCategory: true,
            subtopicCategory: true,
          },
        },
      },
      orderBy: {
        title: 'asc',
      },
    })
  }

  static async getPublicBooksIsbn(isbn: string) {
    return prisma.book.findUnique({
      where: { isbn },
      select: {
        isbn: true,
        title: true,
        language: true,
        summary: true,
        pages: true,
        editionDate: true,
        bookCover: true,
        author: {
          select: {
            nameAuthor: true,
          },
        },
        authors: true,
        category: {
          select: {
            nameCategory: true,
            subtopicCategory: true,
          },
        },
        publisher: {
          select: {
            namePublisher: true,
          },
        },
      },
    })
  }
}
