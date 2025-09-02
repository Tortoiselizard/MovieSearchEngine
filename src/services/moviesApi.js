import { getQueriesString } from '../libs/mappers'
import { ApiError } from '../../errors/ApiError'

export async function requestPopularMovies (queries) {
  try {
    const query = getQueriesString(queries)
    const response = await fetch(`/api/popular${query}`)
    if (!response.ok) {
      const errorData = await response.json()
      throw new ApiError(errorData.message, errorData.code)
    }
    const data = await response.json()
    return data
  } catch (error) {
    if (error instanceof ApiError) {
      throw new Error(error.message)
    }
    if (error.message.includes('NetworkError')) {
      throw new Error('A problem occurred while trying to connect to the server. Check your internet connection')
    }
    throw new Error('Something is wrong')
  }
}

export async function requestMoviesByTitle (queries) {
  try {
    const queriesString = getQueriesString(queries)
    const response = await fetch(`/api/search${queriesString}`)

    if (!response.ok) {
      const errorData = await response.json()
      throw new ApiError(errorData.message, errorData.code)
    }
    const data = await response.json()
    return data
  } catch (error) {
    if (error instanceof ApiError) {
      throw new Error(error.message)
    }
    if (error.message.includes('NetworkError')) {
      throw new Error('A problem occurred while trying to connect to the server. Check your internet connection')
    }
    throw new Error('Something is wrong')
  }
}

export async function requestLeakedMovies (queries) {
  try {
    const queriesString = getQueriesString(queries)
    const response = await fetch(`/api/discover${queriesString}`)
    if (!response.ok) {
      const errorData = await response.json()
      throw new ApiError(errorData.message)
    }
    const data = await response.json()
    return data
  } catch (error) {
    if (error instanceof ApiError) {
      throw new Error(error.message)
    }
    if (error.message.includes('NetworkError')) {
      throw new Error('A problem occurred while trying to connect to the server. Check your internet connection')
    }
    throw new Error('Something is wrong')
  }
}

export async function requestMovies (queries) {
  let response
  const nFilters = Object.keys(queries).length
  if ('title' in queries) {
    response = await requestMoviesByTitle(queries)
  } else if (nFilters > 4) {
    response = await requestLeakedMovies(queries)
  } else {
    response = await requestPopularMovies(queries)
  }
  return response
}

export async function requestMoviesById (id) {
  try {
    const response = await fetch(`/api/findById/${id}`)
    if (!response.ok) {
      const errorData = await response.json()
      throw new ApiError(errorData.message, errorData.code)
    }
    const data = await response.json()
    return data
  } catch (error) {
    if (error instanceof ApiError) {
      throw new Error(error.message)
    }
    if (error.message.includes('NetworkError')) {
      throw new Error('A problem occurred while trying to connect to the server. Check your internet connection')
    }
    throw new Error('Something is wrong')
  }
}

export async function requestActors (id) {
  try {
    const queriesString = getQueriesString({ id })
    const response = await fetch(`/api/cast${queriesString}`)
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message)
    }
    const data = await response.json()
    return data
  } catch (error) {
    if (error instanceof ApiError) {
      throw new Error(error.message)
    }
    if (error.message.includes('NetworkError')) {
      throw new Error('A problem occurred while trying to connect to the server. Check your internet connection')
    }
    throw new Error('Something is wrong')
  }
}

export async function requestMovieGenre () {
  try {
    const response = await fetch('/api/genre')
    if (!response.ok) {
      const errorData = await response.json()
      throw new ApiError(errorData.message, errorData.code)
    }
    const data = await response.json()
    return data
  } catch (error) {
    if (error instanceof ApiError) {
      throw new Error(error.message)
    }
    if (error.message.includes('NetworkError')) {
      throw new Error('A problem occurred while trying to connect to the server. Check your internet connection')
    }
    throw new Error('Something is wrong')
  }
}

export async function requestActor (id) {
  try {
    const response = await fetch(`/api/actor?id=${id}`)
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message)
    }
    const data = await response.json()
    return data
  } catch (error) {
    if (error instanceof ApiError) {
      throw new Error(error.message)
    }
    if (error.message.includes('NetworkError')) {
      throw new Error('A problem occurred while trying to connect to the server. Check your internet connection')
    }
    throw new Error('Something is wrong')
  }
}

export async function requestFilmsActor (id) {
  try {
    const response = await fetch(`/api/moviesByActor?id=${id}`)
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message)
    }
    const data = await response.json()
    return data
  } catch (error) {
    if (error instanceof ApiError) {
      throw new Error(error.message)
    }
    if (error.message.includes('NetworkError')) {
      throw new Error('A problem occurred while trying to connect to the server. Check your internet connection')
    }
    throw new Error('Something is wrong')
  }
}
