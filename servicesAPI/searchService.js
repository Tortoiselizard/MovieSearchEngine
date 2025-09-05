import { SearchRepository } from '../repositoryAPI/searchRepository.js'
import { getFilters, getQueries } from '../libsAPI/mappers.js'
import { filterBy } from '../libsAPI/filters.js'

export class SearchService {
  #searchRepository
  constructor () {
    this.#searchRepository = new SearchRepository()
  }

  async getSearch (query) {
    // Get filters
    const queries = getQueries(query)
    const filters = getFilters(query)

    const moviePackage = {
      results: [],
      lastMovie: queries.lastMovie
    }

    let lastRequest = []
    let page = queries.page
    let totalPages

    // Do request to pages
    do {
      let { results, total_pages } = await this.#searchRepository.getSearchMovies({ ...filters, page })
      results = results.slice(moviePackage.lastMovie)
      totalPages = total_pages
      lastRequest = results
      if (Object.keys(filters).length > 1) {
        results = filterBy({ movies: results, filters })
      }
      moviePackage.results.push(...results)
      moviePackage.page = page
      moviePackage.lastMovie = 0
      filters.currentMovies = [...(filters.currentMovies ? filters.currentMovies : []), ...results.map(movie => movie.id)]
      page++
    } while ((moviePackage.results.length < queries.moviesPerPage) && (page <= totalPages))

    if (moviePackage.results.length > queries.moviesPerPage) {
      moviePackage.results = moviePackage.results.slice(0, queries.moviesPerPage)
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
