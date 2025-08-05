export const UPDATE_MOVIES = 'UPDATE_MOVIES'
export const LOAD_MOVIES = 'LOAD_MOVIES'
export const UPDATE_MODE = 'UPDATE_MODE'

export function updateMovies (newMovies) {
  return {
    type: UPDATE_MOVIES,
    payload: {
      ...newMovies,
      status: 'successful',
      error: null
    }
  }
}

export function loadMovies () {
  return {
    type: LOAD_MOVIES
  }
}

export function updateMode (mode) {
  return {
    type: UPDATE_MODE,
    payload: mode
  }
}
