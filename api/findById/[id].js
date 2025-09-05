import { ApiError } from '../../errors/index.js'

const { API_READ_ACCESS_TOKEN, VITE_API_URL } = process.env

export default async function handler (request, response) {
  const { id } = request.query
  try {
    const url = `${VITE_API_URL}/movie/${id}`
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
    response.status(200).json(data)
  } catch (error) {
    console.log('error:', error)
    if (error.message.includes('fetch failed')) {
      return response.status(500).json({ message: 'A problem occurred while trying to connect to the server. Check your internet connection' })
    }
    return response.status(500).json({ message: 'Something is wrong with the server' })
  }
}
