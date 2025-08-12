export const UPDATE_MOVIES = 'UPDATE_MOVIES'
export const LOAD_MOVIES = 'LOAD_MOVIES'
export const UPDATE_MODE = 'UPDATE_MODE'

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
