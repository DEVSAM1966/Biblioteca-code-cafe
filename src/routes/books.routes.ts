import { Router } from 'express';
import { BooksController } from '../controllers/books.controller';
import { dtoValidationMiddleware } from '../middlewares/dto-validation.middleware';
import { CreateBookDto, UpdateBookDto } from '../dtos/in/book.dto';
import multer from 'multer';
import { uploadBookFiles } from '../middlewares/multer-book.middleware';

const upload = multer({ dest: 'uploads/' });

export const BooksRoutes = Router();

BooksRoutes.get('/isbn/:id', BooksController.getById);

BooksRoutes.get('/title/:name', BooksController.getByName);

BooksRoutes.get('/', BooksController.getAll);

BooksRoutes.post('/', dtoValidationMiddleware(CreateBookDto), BooksController.create);

BooksRoutes.put('/isbn/:id', dtoValidationMiddleware(UpdateBookDto), BooksController.update);

BooksRoutes.put('/:isbn/files', uploadBookFiles, BooksController.updateFiles);

BooksRoutes.delete('/isbn/:id', BooksController.delete);
