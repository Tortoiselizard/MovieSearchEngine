import { getQueriesString } from '../libs/mappers'

export async function requestPopularMovies ({ page }) {
  const response = await fetch(`/api/popular?page=${page}`)
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

export async function requestMoviesById (id) {
  const response = await fetch(`/api/findById/${id}`)
  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message)
  }
  const data = await response.json()
  return data
}
