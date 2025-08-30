export const UPDATE_MOVIES_HOME = 'UPDATE_MOVIES_HOME'
export const UPDATE_MOVIES_SEARCH = 'UPDATE_MOVIES_SEARCH'
export const ADD_MOVIES = 'UPDATE_MOVIES'
export const RESET_MOVIES = 'UPDATE_MOVIES'
export const LOAD_MOVIES = 'LOAD_MOVIES'
export const UPDATE_MODE = 'UPDATE_MODE'
export const LOAD_GENRES = 'LOAD_GENRES'
export const UPDATE_GENRES = 'UPDATE_GENRES'
export const UPDATE_HISTORY = 'UPDATE_HISTORY'
export const UPDATE_ACTOR_FILMS = 'UPDATE_ACTOR_FILMS'
export const UPDATE_CAST = 'UPDATE_CAST'
export const LOAD_CAST = 'LOAD_CAST'
export const LOAD_ACTOR_FILMS = 'LOAD_ACTOR_FILMS'
export const UPDATE_MOVIE_DETAILS = 'UPDATE_MOVIE_DETAILS'
export const LOAD_MOVIE_DETAILS = 'LOAD_MOVIE_DETAILS'
export const UPDATE_ACTOR_DETAILS = 'UPDATE_ACTOR_DETAILS'
export const LOAD_ACTOR_DETAILS = 'LOAD_ACTOR_DETAILS'

export function updateMoviesHome ({ newMoviesData }) {
  return {
    type: UPDATE_MOVIES_HOME,
    payload: {
      newMoviesData: {
        ...newMoviesData,
        status: 'successful',
        error: null
      }
    }
  }
}

export function updateMoviesSearch ({ newMoviesData }) {
  return {
    type: UPDATE_MOVIES_SEARCH,
    payload: {
      newMoviesData: {
        ...newMoviesData,
        status: 'successful',
        error: null
      }
    }
  }
}

export function updateActorFilms (newActorFilms) {
  return {
    type: UPDATE_ACTOR_FILMS,
    payload: {
      newActorFilms: {
        ...newActorFilms,
        status: 'successful',
        error: null
      }
    }
  }
}

export function addMovies ({ currentMoviesData, newMoviesData }) {
  const newList = [...currentMoviesData, ...newMoviesData.list]

  return {
    type: ADD_MOVIES,
    payload: {
      newMoviesData: {
        ...newMoviesData,
        list: newList,
        status: 'successful',
        error: null
      }
    }
  }
}

export function resetMovies ({ mode }) {
  return {
    type: RESET_MOVIES,
    payload: { mode }
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

export function loadActorFilms () {
  return {
    type: LOAD_ACTOR_FILMS
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

export function initializeHistory (newHistory) {
  return {
    type: UPDATE_HISTORY,
    payload: newHistory
  }
}

export function addURLToHistory (newHistory) {
  return {
    type: UPDATE_HISTORY,
    payload: newHistory
  }
}

export function updateLastURLToHistory (newHistory) {
  return {
    type: UPDATE_HISTORY,
    payload: newHistory
  }
}

export function updateCast (newCast) {
  return {
    type: UPDATE_CAST,
    payload: {
      ...newCast,
      status: 'successful',
      error: null
    }
  }
}

export function loadCast () {
  return {
    type: LOAD_CAST
  }
}

export function updateMovieDetails (newMovieDetails) {
  return {
    type: UPDATE_MOVIE_DETAILS,
    payload: {
      ...newMovieDetails,
      status: 'successful',
      error: null
    }
  }
}

export function loadMovieDetails () {
  return {
    type: LOAD_MOVIE_DETAILS
  }
}

export function updateActorDetails (newMovieDetails) {
  return {
    type: UPDATE_ACTOR_DETAILS,
    payload: {
      ...newMovieDetails,
      status: 'successful',
      error: null
    }
  }
}

export function loadActorDetails () {
  return {
    type: LOAD_ACTOR_DETAILS
  }
}
