import { PopularRepository } from '../repositoryAPI/popularRepository.js'
import { getFilters } from '../libsAPI/mappers.js'

export class PopularService {
  #popularRepository
  constructor () {
    this.#popularRepository = new PopularRepository()
  }

  async getPopulars (query) {
    // Get filters
    const filters = getFilters(query)

    const moviePackage = {
      results: [],
      lastMovie: filters.lastMovie
    }

    let lastRequest = []
    let page = filters.page
    let totalPages
    // Do request to pages
    do {
      const { results, total_pages } = await this.#popularRepository.getPopularMovies({ page })
      totalPages = total_pages
      lastRequest = results
      moviePackage.results.push(...results.slice(moviePackage.lastMovie))
      moviePackage.page = page
      moviePackage.lastMovie = 0
      page++
    } while ((moviePackage.results.length < filters.moviesPerPage) && (page <= totalPages))

    if (moviePackage.results.length !== filters.moviesPerPage) {
      moviePackage.results = moviePackage.results.slice(0, filters.moviesPerPage)
      const lastMovie = moviePackage.results[moviePackage.results.length - 1]
      const indexMovie = lastRequest.findIndex(({ id }) => id === lastMovie.id) + 1
      moviePackage.lastMovie = indexMovie
    }

    if (page > totalPages) {
      moviePackage.lastPage = true
    }

    return moviePackage
  }
}
