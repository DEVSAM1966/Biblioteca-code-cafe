import { Router } from 'express'
import { BooksController } from '../controllers/books.controller'
import { BookIsbnDto } from '../dtos/in/book-isbn.dto'
import { BookNameDto } from '../dtos/in/book-name.dto'
import { CreateBookDto } from '../dtos/in/create-book.dto'
import { UpdateBookDto } from '../dtos/in/update-book.dto'
import { dtoValidationMiddleware } from '../middlewares/dto-validation.middleware'
import { uploadBookFiles } from '../middlewares/multer-book.middleware'

export const BooksRoutes = Router()

BooksRoutes.get(
    '/isbn/:isbn', 
    dtoValidationMiddleware(BookIsbnDto, 'params'),
    BooksController.getById,
)

BooksRoutes.get(
    '/title/:name', 
    dtoValidationMiddleware(BookNameDto, 'params'),
    BooksController.getByName,
)

BooksRoutes.get(
    '/', 
    BooksController.getAll,
)

BooksRoutes.post(
    '/', 
    dtoValidationMiddleware(CreateBookDto, 'body'), 
    BooksController.create,
)

BooksRoutes.put(
    '/isbn/:isbn', 
    dtoValidationMiddleware(BookIsbnDto, 'params'),
    dtoValidationMiddleware(UpdateBookDto, 'body'), 
    BooksController.update,
)

BooksRoutes.put(
    '/:isbn/files', 
    dtoValidationMiddleware(BookIsbnDto, 'params'),
    uploadBookFiles(), 
    BooksController.updateFiles,
)

BooksRoutes.delete(
    '/isbn/:isbn', 
    dtoValidationMiddleware(BookIsbnDto, 'params'),
    BooksController.delete,
)
