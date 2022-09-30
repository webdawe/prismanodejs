import express from 'express'

import booksService from '../services/books.service'

import argon2 from 'argon2'

import debug from 'debug'
import { PrismaListTransformer } from '../../common/transformers/prisma/list.transformer'
import { BookCreateTransformer } from '../transformers/books/create.transformer'
import { BookListRequestTransformer } from '../transformers/books/list.request.transformer'

const log: debug.IDebugger = debug('app:users-controller')
class BooksController {
  async list(req: express.Request, res: express.Response) {
    const books = await booksService.list(
      new BookListRequestTransformer(req).transform()
    )
    res.status(200).send(books)
  }

  async show(req: express.Request, res: express.Response) {
    const book = await booksService.show(parseInt(req.params.bookId))
    if (book) {
      res.status(200).send(book)
    }

    res.status(404).send()
  }

  async create(req: express.Request, res: express.Response) {
    const book = await booksService.create(req.body)
    res.status(201).send({ id: book })
  }

  async update(req: express.Request, res: express.Response) {
    await booksService.update(parseInt(req.params.bookId), req.body)

    res.status(204).send()
  }

  async destroy(req: express.Request, res: express.Response) {
    await booksService.destroy(parseInt(req.body.id))
    res.status(204).send()
  }
}

export default new BooksController()
