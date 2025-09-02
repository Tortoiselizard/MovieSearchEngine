import { ApiError } from '../errors/index.js'
import { CastService } from '../servicesAPI/castService.js'

export default async function handler (request, response) {
  const { query } = request

  const castService = new CastService()
  try {
    const cast = await castService.getCast(query)

    response.status(200).json(cast)
  } catch (error) {
    if (error.message.includes('fetch failed')) {
      return response.status(500).json({ message: 'A problem occurred while trying to connect to the server. Check your internet connection' })
    }
    return response.status(500).json({ message: 'Something is wrong with the server' })
  }
}
