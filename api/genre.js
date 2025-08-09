import { ApiError } from '../errors/index.js'
import { GenreService } from '../servicesAPI/genreService.js'

export default async function handler (request, response) {
  const genreService = new GenreService()
  try {
    const genres = await genreService.getGenres()

    response.status(200).json(genres)
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
