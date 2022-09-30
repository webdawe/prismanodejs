import { CommonRoutes } from '../common/common.routes'
import express from 'express'
import booksController from './controllers/books.controller'
import DtoValidator from '../common/middleware/dto.validator'
import { CreateBookDto } from './dto/books/create.dto'
import { UpdateBookDto } from './dto/books/update.dto'

export class BookRoutes extends CommonRoutes {
  constructor(app: express.Application) {
    super(app, 'BookRoutes')
  }

  configureRoutes(): express.Application {
    this.app
      .route(`/books`)
      .get(booksController.list)
      .post(DtoValidator(CreateBookDto), booksController.create)

    this.app
      .route(`/books/:bookId`)
      .patch(DtoValidator(UpdateBookDto), booksController.update)
      .get(booksController.show)
      .delete(booksController.destroy)

    return this.app
  }
}
