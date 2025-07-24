export class ApiError extends Error {
  constructor (message, statusCode, details = {}) {
    super(message)
    this.name = 'ApiError'
    this.statusCode = statusCode
    this.details = details
    this.totalMessage = `${this.name} (${this.statusCode}): ${message}`
  }
}
