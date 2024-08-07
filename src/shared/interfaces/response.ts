import { isArray } from 'lodash'
import { BaseRecord, Either } from './common'

class ErrorException {
  message: string
  code: string
  constructor({ message, code }: ErrorException) {
    this.message = message
    this.code = code
  }

  static hasError(json: any): boolean {
    if (json?.['error'] || (json?.['errors'] && isArray(json?.['errors'])))
      return true
    return false
  }

  static fromJson(json: any): ErrorException {
    const code = json?.['status'] ?? 500
    if (json?.['error'])
      return {
        code: code,
        message: json?.['message'],
      }
    if (json?.['errors'] && isArray(json?.['errors'])) {
      const errors = json?.['errors'] as []
      const message: string = errors
        .map((x) => {
          return x?.['message']
        })
        .join('/n') as string
      return {
        code: code,
        message: message,
      }
    }
    return {
      code: code,
      message: '',
    }
  }
}

export type CustomGraphQLResponse = Either<ErrorException, BaseRecord>
export default ErrorException
