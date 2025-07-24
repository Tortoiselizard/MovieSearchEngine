export const UPDATE_MOVIES = 'UPDATE_MOVIES'
export const LOAD_MOVIES = 'LOAD_MOVIES'

export function updateMovies (list) {
  return {
    type: UPDATE_MOVIES,
    payload: {
      list,
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
