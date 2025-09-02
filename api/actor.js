import { ApiError } from '../errors/index.js'
import { ActorService } from '../servicesAPI/actorService.js'

export default async function handler (request, response) {
  const { query } = request

  const actorService = new ActorService()
  try {
    const actor = await actorService.getActor(query)

    response.status(200).json(actor)
  } catch (error) {
    if (error.message.includes('fetch failed')) {
      return response.status(500).json({ message: 'A problem occurred while trying to connect to the server. Check your internet connection' })
    }
    return response.status(500).json({ message: 'Something is wrong with the server' })
  }
}
