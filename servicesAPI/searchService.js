import { SearchRepository } from '../repositoryAPI/searchRepository.js'
import { getAPIPages, mapMovies } from '../libsAPI/pagination.js'
import { getFilters } from '../libsAPI/mappers.js'
import { filterBy } from '../libsAPI/filters.js'

export class SearchService {
  #searchRepository
  constructor () {
    this.#searchRepository = new SearchRepository()
  }

  async getSearch (query) {
    // Get filters
    const filters = getFilters(query)

    // Get pages to do request
    const { pages, startMovie } = getAPIPages(filters)

    // Do request to pages
    const moviesAPI = []
    for (const page of pages) {
      const response = await this.#searchRepository.getSearchMovies({ ...filters, page })
      moviesAPI.push(response)
    }

    let response
    // Apply other filters
    if (Object.keys(filters).length > 3) {
      const moviesFiltered = filterBy({ movies: moviesAPI[0].results, filters })

      for (let pag = filters.page + 1; moviesFiltered.length < filters.moviesPerPage && pag <= moviesAPI[0].total_pages; pag++) {
        const { results } = await this.#searchRepository.getSearchMovies({ ...filters, page: pag })
        const resultsFiltered = filterBy({ movies: results, filters })
        moviesFiltered.push(...resultsFiltered)
      }

      const totalMoviesFiltered = moviesFiltered.slice(0, filters.moviesPerPage)
      response = {
        page: 1,
        results: totalMoviesFiltered,
        total_pages: 1,
        total_results: totalMoviesFiltered.length
      }
    } else {
      // map response request
      response = mapMovies({ moviesAPI, start: startMovie, ...filters })
      if (filters.page * filters.moviesPerPage > 100) {
        const resultLength = response.results.length
        const leftover = startMovie + resultLength - 100
        if (leftover > 0) {
          response.results = response.results.slice(0, resultLength - leftover + 1)
        }
      }
    }

    return response
  }
}
