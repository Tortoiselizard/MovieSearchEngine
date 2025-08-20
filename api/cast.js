import { ApiError } from '../errors/index.js'
import { CastService } from '../servicesAPI/castService.js'

export default async function handler (request, response) {
  const { query } = request

  const castService = new CastService()
  try {
    const cast = await castService.getCast(query)

    response.status(200).json(cast)
  } catch (error) {
    if (error instanceof ApiError) {
      return response.status(error.statusCode).json({
        success: false,
        message: error.totalMessage,
        details: error.details
      })
    }
    response.status(500).json({
      success: false,
      message: 'something is wrong'
    })
  }
}
