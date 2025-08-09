import { ApiError } from '../errors/index.js'
import { SearchService } from '../servicesAPI/searchService.js'

const { API_READ_ACCESS_TOKEN, VITE_API_URL } = process.env

export default async function handler (request, response) {
  const { query } = request

  const searchService = new SearchService()
  try {
    const text = query.query
    const page = Number(query.page) || 1
    const moviesPerPage = Number(query.quantity) || 20

    const movies = await searchService.getSearch({ text, page, moviesPerPage })

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
