import { getQueriesString } from '../libs/mappers'

export async function requestPopularMovies (queries) {
  const query = getQueriesString(queries)
  const response = await fetch(`/api/popular${query}`)
  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message)
  }
  const data = await response.json()
  return data
}

export async function requestMoviesByTitle (queries) {
  const queriesString = getQueriesString(queries)
  const response = await fetch(`/api/search${queriesString}`)
  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message)
  }
  const data = await response.json()
  return data
}

export async function requestLeakedMovies (queries) {
  const queriesString = getQueriesString(queries)
  const response = await fetch(`/api/discover${queriesString}`)
  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message)
  }
  const data = await response.json()
  return data
}

export async function requestMoviesById (id) {
  const response = await fetch(`/api/findById/${id}`)
  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message)
  }
  const data = await response.json()
  return data
}

export async function requestMovieGenre () {
  const response = await fetch('/api/genre')
  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message)
  }
  const data = await response.json()
  return data
}
