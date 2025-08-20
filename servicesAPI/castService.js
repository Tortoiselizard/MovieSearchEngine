import { CastRepository } from '../repositoryAPI/castRepository.js'

export class CastService {
  #castRepository
  constructor () {
    this.#castRepository = new CastRepository()
  }

  async getCast (query) {
    const { cast } = await this.#castRepository.getCastMovie(query)
    return cast
  }
}
