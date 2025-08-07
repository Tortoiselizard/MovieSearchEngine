import { PopularRepository } from '../repositoryAPI/popularRepository.js'
import { getAPIPages, mapMovies } from '../libsAPI/pagination.js'

export class PopularService {
  #popularRepository
  constructor () {
    this.#popularRepository = new PopularRepository()
  }

  async getPopulars ({ page, moviesPerPage }) {
    // Get pages to do request
    const { pages, startPage } = getAPIPages({ page, moviesPerPage })

    // Do request to pages
    const moviesAPI = []
    for (const page of pages) {
      const response = await this.#popularRepository.getPopularMovies({ page })
      moviesAPI.push(response)
    }

    // map response request
    const response = mapMovies({ moviesAPI, start: startPage, moviesPerPage, page })

    // return await this.#popularRepository.getPopularMovies({ page })
    return response
  }
}
