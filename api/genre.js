import { ApiError } from '../errors/index.js'
import { GenreService } from '../servicesAPI/genreService.js'

export default async function handler (request, response) {
  const genreService = new GenreService()
  try {
    const genres = await genreService.getGenres()

    response.status(200).json(genres)
  } catch (error) {
    if (error.message.includes('fetch failed')) {
      return response.status(500).json({ message: 'A problem occurred while trying to connect to the server. Check your internet connection' })
    }
    return response.status(500).json({ message: 'Something is wrong with the server' })
  }
}
