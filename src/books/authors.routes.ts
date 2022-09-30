import { CommonRoutes } from '../common/common.routes'
import express from 'express'
import authorController from './controllers/author.controller'
import DtoValidator from '../common/middleware/dto.validator'
import { CreateAuthorDto } from './dto/authors/create.dto'
import { UpdateAuthorDto } from './dto/authors/update.dto'

export class AuthorRoutes extends CommonRoutes {
  constructor(app: express.Application) {
    super(app, 'AuthorRoutes')
  }

  configureRoutes(): express.Application {
    this.app
      .route(`/authors`)
      .get(authorController.list)
      .post(
        DtoValidator(CreateAuthorDto),
        authorController.create
      )

    this.app
      .route(`/authors/:authorId`)
      .get(authorController.show)
      .patch(
        DtoValidator(UpdateAuthorDto),
        authorController.update
        )
      .delete(authorController.destroy)

    return this.app
  }
}
