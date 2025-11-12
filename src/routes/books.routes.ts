import { Router } from 'express'
import { BooksController } from '../controllers/books.controller'
import { dtoValidationMiddleware } from '../middlewares/dto-validation.middleware'
import { CreateBookDto } from '../dtos/in/create-book.dto'
import { uploadBookFiles } from '../middlewares/multer-book.middleware'
import { UpdateBookDto } from '../dtos/in/update-book.dto'

export const BooksRoutes = Router()

BooksRoutes.get('/isbn/:id', BooksController.getById)

BooksRoutes.get('/title/:name', BooksController.getByName)

BooksRoutes.get('/', BooksController.getAll)

BooksRoutes.post('/', dtoValidationMiddleware(CreateBookDto), BooksController.create)

BooksRoutes.put('/isbn/:id', dtoValidationMiddleware(UpdateBookDto), BooksController.update)

BooksRoutes.put('/:isbn/files', uploadBookFiles(), BooksController.updateFiles)

BooksRoutes.delete('/isbn/:id', BooksController.delete)
