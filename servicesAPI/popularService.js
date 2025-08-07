import { PopularRepository } from '../repositoryAPI/popularRepository.js'
import { getAPIPages, mapMovies } from '../libsAPI/pagination.js'

export class PopularService {
  #popularRepository
  constructor () {
    this.#popularRepository = new PopularRepository()
  }

  async getPopulars ({ page, moviesPerPage }) {
    // Get pages to do request
    const { pages, startMovie } = getAPIPages({ page, moviesPerPage })

    // Do request to pages
    const moviesAPI = []
    for (const page of pages) {
      const response = await this.#popularRepository.getPopularMovies({ page })
      moviesAPI.push(response)
    }

    // map response request
    const response = mapMovies({ moviesAPI, start: startMovie, moviesPerPage, page })
    if (page * moviesPerPage > 100) {
      const resultLength = response.results.length
      const leftover = startMovie + resultLength - 100
      if (leftover > 0) {
        response.results = response.results.slice(0, resultLength - leftover + 1)
      }
    }

    // return await this.#popularRepository.getPopularMovies({ page })
    return response
  }
}
