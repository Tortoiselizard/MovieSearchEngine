const { API_READ_ACCESS_TOKEN, VITE_API_URL } = process.env

export class PopularRepository {
  async getPopularMovies ({ page }) {
    const url = `${VITE_API_URL}/movie/popular?page=${page}`

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${API_READ_ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
      }
    }

    const responseApi = await fetch(url, options)
    const data = await responseApi.json()
    return data
  }
}
