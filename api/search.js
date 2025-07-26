import { ApiError } from '../errors/index.js'

const { API_READ_ACCESS_TOKEN, VITE_API_URL } = process.env

const necessaryData = ['title', 'backdrop_path', 'poster_path', 'vote_average', 'release_date', 'overview', 'genre_ids']

export default async function handler (request, response) {
  const { query } = request
  try {
    const { query: text } = query
    const url = `${VITE_API_URL}/search/movie?query=${text}`
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
        scope: 'requesting trending movies'
      }
      const newError = new ApiError(errorData.status_message, responseApi.status, errorDetails)
      throw newError
    }
    const data = await responseApi.json()
    const moviesFiltered = data.results.filter(movie => necessaryData.every(property => movie[property]))
    const dataFiltered = {
      ...data,
      results: moviesFiltered
    }
    response.status(200).json(dataFiltered)
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
