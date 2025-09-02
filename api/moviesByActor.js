import { ApiError } from '../errors/index.js'
import { MoviesByActorService } from '../servicesAPI/moviesByActorService.js'

export default async function handler (request, response) {
  const { query } = request

  const moviesByActorService = new MoviesByActorService()
  try {
    const movies = await moviesByActorService.getFilmsActor(query)

    response.status(200).json(movies)
  } catch (error) {
    if (error.message.includes('fetch failed')) {
      return response.status(500).json({ message: 'A problem occurred while trying to connect to the server. Check your internet connection' })
    }
    return response.status(500).json({ message: 'Something is wrong with the server' })
  }
}
