import { MoviesByActorRepository } from '../repositoryAPI/moviesByActorRepository.js'

export class MoviesByActorService {
  #moviesByActorRepository
  constructor () {
    this.#moviesByActorRepository = new MoviesByActorRepository()
  }

  async getFilmsActor (query) {
    const { cast } = await this.#moviesByActorRepository.requestFilmsActor(query)
    return cast
  }
}
