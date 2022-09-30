import express from 'express'
import debug from 'debug'
import authorsService from '../services/authors.service'
import DtoValidator from '../../common/middleware/dto.validator'
import { CreateAuthorDto } from '../dto/authors/create.dto'
import { AuthorListRequestTransformer } from '../transformers/authors/list.request.transformer'
import { QueryBuilder } from '../../common/queries/query-builder'

const log: debug.IDebugger = debug('app:authors-controller')
class AuthorsController {
  async list(req: express.Request, res: express.Response) {
   
    const query = req.query
    const authors = await authorsService.list(
      (new QueryBuilder(query))
    .filter()
    .paginate()
    .select()
    .select()
    .build()
      //new AuthorListRequestTransformer(req).transform()
    )
    res.status(200).send(authors)
  }

  async show(req: express.Request, res: express.Response) {
    const author = await authorsService.show(parseInt(req.params.authorId))
    if (author) {
      res.status(200).send(author)
    }

    res.status(404).send()
  }

  async create(req: express.Request, res: express.Response) {
    const author = await authorsService.create(req.body)
    res.status(201).send({ id: author })
  }

  async update(req: express.Request, res: express.Response) {
    await authorsService.update(parseInt(req.params.authorId), req.body)

    res.status(204).send()
  }

  async destroy(req: express.Request, res: express.Response) {
    await authorsService.destroy(parseInt(req.body.id))
    res.status(204).send()
  }
}

export default new AuthorsController()
