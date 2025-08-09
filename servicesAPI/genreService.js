import { GenreRepository } from '../repositoryAPI/genreRepository.js'

export class GenreService {
  #genreRepository
  constructor () {
    this.#genreRepository = new GenreRepository()
  }

  async getGenres () {
    const response = await this.#genreRepository.getAllGenres()
    return response
  }
}
