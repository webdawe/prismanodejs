import express from 'express'
import { QueryBuilder } from './query-builder'

export class QueryFilter {
  req: express.Request
  builder: any

  constructor(req: express.Request) {
    this.req = req
  }

  apply(builder: QueryBuilder): QueryBuilder {
    this.builder = builder
    const filters = this.filters()

    if (! filters ){
        return  this.builder
    }

    filters.forEach((parameter, method) => {
      Object.call(this, [method, parameter])
    })

    return  this.builder
  }

  filters() {
    return this.req.query
  }
}
