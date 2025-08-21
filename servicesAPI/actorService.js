import { ActorRepository } from '../repositoryAPI/actorRepository'

export class ActorService {
  #actorRepository
  constructor () {
    this.#actorRepository = new ActorRepository()
  }

  async getActor (query) {
    const actor = await this.#actorRepository.requestActor(query)
    return actor
  }
}
