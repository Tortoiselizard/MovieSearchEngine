import { getQueriesString } from '../src/libs/mappers.js'

const { API_READ_ACCESS_TOKEN, VITE_API_URL } = process.env

export class DiscoverRepository {
  async getDiscoverMovies (queries) {
    const filters = getQueriesString(queries)
    const url = `${VITE_API_URL}/discover/movie${filters}`

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${API_READ_ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
      }
    }

    const responseApi = await fetch(url, options)
    if (!responseApi.ok) {
      const errorData = await responseApi.json()
      const errorDetails = {
        scope: 'requesting discover movies'
      }
      const newError = new ApiError(errorData.status_message, responseApi.status, errorDetails)
      throw newError
    }
    const data = await responseApi.json()
    return data
  }
}
