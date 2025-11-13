import { Router } from 'express'
import { BooksController } from '../controllers/books.controller'
import { CreateBookDto } from '../dtos/in/create-book.dto'
import { UpdateBookDto } from '../dtos/in/update-book.dto'
import { dtoValidationMiddleware } from '../middlewares/dto-validation.middleware'
import { uploadBookFiles } from '../middlewares/multer-book.middleware'

export const BooksRoutes = Router()

BooksRoutes.get('/isbn/:id', BooksController.getById)

BooksRoutes.get('/title/:name', BooksController.getByName)

BooksRoutes.get('/', BooksController.getAll)

BooksRoutes.post('/', dtoValidationMiddleware(CreateBookDto), BooksController.create)

BooksRoutes.put('/isbn/:id', dtoValidationMiddleware(UpdateBookDto), BooksController.update)

BooksRoutes.put('/:isbn/files', uploadBookFiles(), BooksController.updateFiles)

BooksRoutes.delete('/isbn/:id', BooksController.delete)
