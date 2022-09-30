import express from 'express';
import { HttpException } from "../exceptions/http.exception"

const errorHandler = (error:any, req: express.Request, res: express.Response) => {
  console.log( `error ${error.status}`) // log the error
  const status = error.status || 400
  res.status(status).send(error.message)
}
export default errorHandler