export const UPDATE_MOVIES = 'UPDATE_MOVIES'
export const LOAD_MOVIES = 'LOAD_MOVIES'
export const UPDATE_MODE = 'UPDATE_MODE'

export function updateMovies ({ list, category, title, page, totalPages }) {
  return {
    type: UPDATE_MOVIES,
    payload: {
      list,
      status: 'successful',
      error: null,
      category,
      title: title || null,
      page,
      totalPages
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
