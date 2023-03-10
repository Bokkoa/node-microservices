import { CustomError } from './custom-error';

export class NotFoundError extends CustomError {
  statusCode: number = 404

  constructor() {
    super('Router not found')

    Object.setPrototypeOf(this, NotFoundError.prototype)
  }

  serializeErrors() {
      return [{ message: 'Not Found' }]
  }
}
