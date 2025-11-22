import { Router } from 'express'
import { BooksController } from '../controllers/books.controller'
import { BookIsbnDto } from '../dtos/in/book-isbn.dto'
import { BookNameDto } from '../dtos/in/book-name.dto'
import { CreateBookDto } from '../dtos/in/create-book.dto'
import { UpdateBookDto } from '../dtos/in/update-book.dto'
import { dtoValidationMiddleware } from '../middlewares/dto-validation.middleware'
import { uploadBookFiles } from '../middlewares/multer-book.middleware'
import { authMiddleware } from '../middlewares/auth.middleware'
import { authorize } from '../middlewares/authorize.middleware'
import { UserRole } from '@prisma/client'

export const BooksRoutes = Router()

BooksRoutes.get(
  '/isbn/:isbn',
  authMiddleware(), 
  authorize([UserRole.ADMIN, UserRole.SUPPORT, UserRole.USER]), 
  dtoValidationMiddleware(BookIsbnDto, 'params'),
  BooksController.getById,
)

BooksRoutes.get(
  '/title/:name',
  authMiddleware(), 
  authorize([UserRole.ADMIN, UserRole.SUPPORT, UserRole.USER]), 
  dtoValidationMiddleware(BookNameDto, 'params'),
  BooksController.getByName,
)

BooksRoutes.get(
  '/', 
  authMiddleware(), 
  authorize([UserRole.ADMIN, UserRole.SUPPORT, UserRole.USER]), 
  BooksController.getAll,
)

BooksRoutes.post(
  '/', 
  authMiddleware(), 
  authorize([UserRole.ADMIN, UserRole.SUPPORT]), 
  dtoValidationMiddleware(CreateBookDto, 'body'), 
  BooksController.create,
)

BooksRoutes.put(
  '/isbn/:isbn',
  authMiddleware(), 
  authorize([UserRole.ADMIN, UserRole.SUPPORT]), 
  dtoValidationMiddleware(BookIsbnDto, 'params'),
  dtoValidationMiddleware(UpdateBookDto, 'body'),
  BooksController.update,
)

BooksRoutes.put(
  '/:isbn/files',
  authMiddleware(), 
  authorize([UserRole.ADMIN, UserRole.SUPPORT]), 
  dtoValidationMiddleware(BookIsbnDto, 'params'),
  uploadBookFiles(),
  BooksController.updateFiles,
)

BooksRoutes.delete(
  '/isbn/:isbn',
  authMiddleware(), 
  authorize([UserRole.ADMIN]), 
  dtoValidationMiddleware(BookIsbnDto, 'params'),
  BooksController.delete,
)
