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

export async function requestMovies (queries) {
  let response
  const nFilters = Object.keys(queries).length
  if ('title' in queries) {
    response = await requestMoviesByTitle(queries)
  } else if (nFilters > 3) {
    response = await requestLeakedMovies(queries)
  } else {
    response = await requestPopularMovies(queries)
  }
  return response
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

export async function requestActors (id) {
  const queriesString = getQueriesString({ id })
  const response = await fetch(`/api/cast${queriesString}`)
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
