import { ApiError } from '../errors/index.js'
import { PopularService } from '../servicesAPI/popularService.js'

export default async function handler (request, response) {
  const { query } = request

  const popularService = new PopularService()
  try {
    const page = Number(query.page) || 1
    const moviesPerPage = Number(query.quantity) || 20

    const movies = await popularService.getPopulars({ page, moviesPerPage })

    response.status(200).json(movies)
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
