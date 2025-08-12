export const UPDATE_MOVIES = 'UPDATE_MOVIES'
export const LOAD_MOVIES = 'LOAD_MOVIES'
export const UPDATE_MODE = 'UPDATE_MODE'
export const LOAD_GENRES = 'LOAD_GENRES'
export const UPDATE_GENRES = 'UPDATE_GENRES'

export function updateMovies ({ newMoviesData, mode }) {
  return {
    type: UPDATE_MOVIES,
    payload: {
      newMoviesData: {
        ...newMoviesData,
        status: 'successful',
        error: null
      },
      mode
    }
  }
}

export function loadMovies ({ mode }) {
  return {
    type: LOAD_MOVIES,
    payload: {
      mode
    }
  }
}

export function updateMode (mode) {
  return {
    type: UPDATE_MODE,
    payload: mode
  }
}

export function updateGenres (genres) {
  return {
    type: UPDATE_GENRES,
    payload: genres
  }
}

export function loadGenres () {
  return {
    type: LOAD_GENRES
  }
}
