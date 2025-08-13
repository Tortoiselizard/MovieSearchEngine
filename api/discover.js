import { ApiError } from '../errors/index.js'
import { DiscoverService } from '../servicesAPI/discoverService.js'

export default async function handler (request, response) {
  const { query } = request

  const discoverService = new DiscoverService()
  try {
    const movies = await discoverService.getDiscover(query)

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
