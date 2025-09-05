import { ApiError } from '../errors/index.js'
import { SearchService } from '../servicesAPI/searchService.js'

export default async function handler (request, response) {
  const { query } = request

  const searchService = new SearchService()
  try {
    const movies = await searchService.getSearch(query)

    response.status(200).json(movies)
  } catch (error) {
    if (error.message.includes('fetch failed')) {
      return response.status(500).json({ message: 'A problem occurred while trying to connect to the server. Check your internet connection' })
    }
    return response.status(500).json({ message: 'Something is wrong with the server' })
  }
}
