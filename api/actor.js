import { ApiError } from '../errors/index.js'
import { ActorService } from '../servicesAPI/actorService.js'

export default async function handler (request, response) {
  const { query } = request

  const actorService = new ActorService()
  try {
    const actor = await actorService.getActor(query)

    response.status(200).json(actor)
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
