import { PrismaListTransformer } from '../../../common/transformers/prisma/list.transformer';
import express from 'express';
export class BookListRequestTransformer extends PrismaListTransformer {
    req: any

    constructor (req: express.Request) {
       const params =  {
        limit: req.query.limit  ?? process.env.LIMIT,
        page: req.query.page ?? 1,
        include: {
            author: true
        }
       }
        
        super(params)
    }

}