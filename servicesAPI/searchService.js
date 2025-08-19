import { SearchRepository } from '../repositoryAPI/searchRepository.js'
import { getFilters } from '../libsAPI/mappers.js'

export class SearchService {
  #searchRepository
  constructor () {
    this.#searchRepository = new SearchRepository()
  }

  async getSearch (query) {
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
      const { results, total_pages } = await this.#searchRepository.getSearchMovies({ ...filters, page })
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
    for (let page = filters.page; moviePackage.results.length < filters.moviesPerPage; page++) {
      const { results } = await this.#searchRepository.getSearchMovies({ ...filters, page })
      moviePackage.results.push(...results.slice(moviePackage.lastMovie))
      moviePackage.page = page
    }

    if (moviePackage.results.length !== filters.moviesPerPage) {
      moviePackage.results = moviePackage.results.slice(0, filters.moviesPerPage)
      moviePackage.lastMovie = filters.moviesPerPage
    }

    return moviePackage
    // let response
    /// / Apply other filters
    /// / if (Object.keys(filters).length > 3) {
    // if (false) {
    // const moviesFiltered = filterBy({ movies: moviesAPI[0].results, filters })

    // for (let pag = filters.page + 1; moviesFiltered.length < filters.moviesPerPage && pag <= moviesAPI[0].total_pages; pag++) {
    // const { results } = await this.#searchRepository.getSearchMovies({ ...filters, page: pag })
    // const resultsFiltered = filterBy({ movies: results, filters })
    // moviesFiltered.push(...resultsFiltered)
    // }

    // const totalMoviesFiltered = moviesFiltered.slice(0, filters.moviesPerPage)
    // response = {
    // page: 1,
    // results: totalMoviesFiltered,
    // total_pages: 1,
    // total_results: totalMoviesFiltered.length
    // }
    // } else {
    /// / map response request
    // response = mapMovies({ moviesAPI, start: startMovie, ...filters })
    // if (filters.page * filters.moviesPerPage > 100) {
    // const resultLength = response.results.length
    // const leftover = startMovie + resultLength - 100
    // if (leftover > 0) {
    // response.results = response.results.slice(0, resultLength - leftover + 1)
    // }
    // }
    // }

    // return response
  }
}
