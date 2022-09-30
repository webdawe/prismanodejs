import { PrismaListTransformer } from '../../../common/transformers/prisma/list.transformer'
import express from 'express'

import { QueryBuilder } from '../../../common/queries/query-builder'
export class AuthorListRequestTransformer extends PrismaListTransformer {
  req: any

  constructor(req: express.Request) {
   
    const queries = req.query
    
    const params = {
      limit: req.query.limit ?? process.env.LIMIT,
      page: req.query.page ?? 1,
      order: req.query.page ?? 1,
      include: {
        books: true
      }
    }

    super(params)
  }
}
