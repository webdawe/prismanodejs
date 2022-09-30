import { RequestHandler } from 'express'
import { plainToInstance } from 'class-transformer'
import { validate, ValidationError } from 'class-validator'
import { sanitize, Trim } from 'class-sanitizer'
import { HttpException } from '../exceptions/http.exception'
import { HttpStatusCode } from '../enums/http.status-code.enum'

const DtoValidator = (
  type: any,
  skipMissingProperties = false
): RequestHandler => {
  return (req, res, next) => {
    const dtoObject = plainToInstance(type, req.body)
    validate(dtoObject, { skipMissingProperties }).then(
      (errors: ValidationError[]) => {
        if (errors.length > 0) {
          const dtoErrors = errors
            .map((error: ValidationError) =>
              (Object as any).values(error.constraints)
            )
            .join(', ')
            res.status(HttpStatusCode.BAD_REQUEST).send({
            error: dtoErrors
          })
        } else {
          //sanitize the object and call the next middleware
          sanitize(dtoObject)
          req.body = dtoObject
          next()
        }
      }
    )
  }
}

export default DtoValidator
