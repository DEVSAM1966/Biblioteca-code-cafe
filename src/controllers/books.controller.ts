import type { Request, Response } from 'express'
import { BadRequestError } from '../models/errors/bad-request.error'
import { BooksService } from '../services/books.service'
import { success } from '../utilities/success.utility'
import type { BookIsbnDto } from '../dtos/in/book-isbn.dto'
import type { BookNameDto } from '../dtos/in/book-name.dto'
import type { CreateBookDto } from '../dtos/in/create-book.dto'
import type { UpdateBookDto } from '../dtos/in/update-book.dto'

export class BooksController {
  static async getById(request: Request, response: Response): Promise<void> {
    const { isbn } = request.params as unknown as BookIsbnDto

    const booksOutdto = await BooksService.getById(isbn)

    response.status(200).json(success(booksOutdto))
  }

  static async getByName(request: Request, response: Response): Promise<void> {
    const { name } = request.params as unknown as BookNameDto

    const booksOutdto = await BooksService.getByName(name)

    response.status(200).json(success(booksOutdto))
  }

  static async getAll(_request: Request, response: Response): Promise<void> {
    const booksOutDto = await BooksService.getAll()

    response.status(200).json(success(booksOutDto))
  }

  static async create(request: Request, response: Response): Promise<void> {
    const createBookDto = request.body as CreateBookDto

    const bookDto = await BooksService.create(createBookDto)

    response.status(201).json(success(bookDto))
  }

  static async update(request: Request, response: Response): Promise<void> {
    const { isbn } = request.params as unknown as BookIsbnDto

    const updateBookDto = request.body as UpdateBookDto

    const bookDto = await BooksService.update(isbn, updateBookDto)

    response.status(200).json(success(bookDto))
  }

  static async updateFiles(request: Request, response: Response): Promise<void> {
    const { isbn } = request.params

    const files = request.files as {
      bookCover?: Express.Multer.File[]
      bookFile?: Express.Multer.File[]
    }

    const bookCover = files.bookCover?.[0]
    const bookFile = files.bookFile?.[0]

    if (!bookCover || !bookFile) {
      throw new BadRequestError("Both 'bookCover' and 'bookFile' must be provided")
    }

    const bookCoverPath = `uploads/cover/${BooksService.generateSafeFilename(bookCover.originalname, isbn)}`
    const bookFilePath = `uploads/file/${BooksService.generateSafeFilename(bookFile.originalname, isbn)}`

    const bookDto = await BooksService.updateFiles(isbn, {
      bookCover: bookCoverPath,
      bookFile: bookFilePath,
      bookCoverBuffer: bookCover.buffer,
      bookFileBuffer: bookFile.buffer,
    })

    response.status(200).json(success(bookDto))
  }

  static async delete(request: Request, response: Response): Promise<void> {
    const { isbn } = request.params as unknown as BookIsbnDto

    const existing = await BooksService.delete(isbn)

    response.status(200).json(success(existing))
  }

  static async getPublicBooks(request: Request, response: Response): Promise<void> {
    const { page = 1, limit = 10, authorId, categoryId } = request.query

    const booksOutDto = await BooksService.getPublicBooks(Number(page), Number(limit), {
      authorId: authorId ? Number(authorId) : undefined,
      categoryId: categoryId ? Number(categoryId) : undefined,
    })

    response.status(200).json(success(booksOutDto))
  }

  static async getPublicBooksIsbn(request: Request, response: Response): Promise<void> {
    const { isbn } = request.params as unknown as BookIsbnDto

    const bookOutDto = await BooksService.getPublicBooksIsbn(isbn)

    response.status(200).json(success(bookOutDto))
  }

  static async getPrivateBookFile(request: Request, response: Response): Promise<void> {
    const { isbn } = request.params as unknown as BookIsbnDto

    const book = await BooksService.getById(isbn)

    const filePath = String(book.bookFile)

    const fileUrl = `${request.protocol}://${request.get('host')}/${filePath}`

    response.status(200).json(success({ fileUrl }))
  }
}
