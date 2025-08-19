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
    // Do request to pages
    for (let page = filters.page; moviePackage.results.length < filters.moviesPerPage; page++) {
      const { results } = await this.#popularRepository.getPopularMovies({ page })
      moviePackage.results.push(...results.slice(moviePackage.lastMovie))
      moviePackage.page = page
    }

    if (moviePackage.results.length !== filters.moviesPerPage) {
      moviePackage.results = moviePackage.results.slice(0, filters.moviesPerPage)
      moviePackage.lastMovie = filters.moviesPerPage
    }

    return moviePackage
  }
}
