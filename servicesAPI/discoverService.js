import { DiscoverRepository } from '../repositoryAPI/discoverRepository.js'
import { getAPIPages, mapMovies } from '../libsAPI/pagination.js'
import { getFilters } from '../libsAPI/mappers.js'

export class DiscoverService {
  #discoverRepository
  constructor () {
    this.#discoverRepository = new DiscoverRepository()
  }

  async getDiscover (query) {
    // Get filters
    const filters = getFilters(query)

    // Get pages to do request
    const { pages, startMovie } = getAPIPages(filters)

    // Do request to pages
    const moviesAPI = []
    for (const page of pages) {
      const response = await this.#discoverRepository.getDiscoverMovies({ ...filters, page })
      moviesAPI.push(response)
    }

    // map response request
    const response = mapMovies({ moviesAPI, start: startMovie, ...filters })
    if (filters.page * filters.moviesPerPage > 100) {
      const resultLength = response.results.length
      const leftover = startMovie + resultLength - 100
      if (leftover > 0) {
        response.results = response.results.slice(0, resultLength - leftover + 1)
      }
    }

    return response
  }
}
