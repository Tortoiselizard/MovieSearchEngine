const { API_READ_ACCESS_TOKEN, VITE_API_URL } = process.env

export class SearchRepository {
  async getSearchMovies ({ title, page }) {
    const url = `${VITE_API_URL}/search/movie?query=${title}&page=${page}`

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
        scope: 'requesting search movies'
      }
      const newError = new ApiError(errorData.status_message, responseApi.status, errorDetails)
      throw newError
    }
    const data = await responseApi.json()
    return data
  }
}
