import { createContext, useContext, useReducer } from 'react'
import {
  UPDATE_MOVIES_HOME,
  UPDATE_MOVIES_SEARCH,
  UPDATE_ERROR_MOVIES_SEARCH,
  ADD_MOVIES,
  RESET_MOVIES,
  LOAD_MOVIES,
  UPDATE_MODE,
  LOAD_GENRES,
  UPDATE_GENRES,
  UPDATE_ERROR_GENRES,
  UPDATE_HISTORY,
  UPDATE_ACTOR_FILMS,
  UPDATE_CAST,
  LOAD_CAST,
  LOAD_ACTOR_FILMS,
  UPDATE_MOVIE_DETAILS,
  LOAD_MOVIE_DETAILS,
  UPDATE_ACTOR_DETAILS,
  LOAD_ACTOR_DETAILS,
  UPDATE_ERROR_ACTOR_DETAILS,
  UPDATE_ALERT,
  CLOSE_ALERT,
  UPDATE_ERROR_MOVIES_HOME,
  UPDATE_ERROR_MOVIES_DETAILS
} from './actions'

// Make context
const MyContext = createContext()

// Initial state
const initialState = {
  home: {
    movies: {
      status: 'idle',
      error: null,
      list: [],
      page: 1,
      totalPages: 1
    }
  },
  search: {
    movies: {
      status: 'idle',
      error: null,
      list: [],
      page: 1,
      totalPages: 1
    }
  },
  genres: {
    status: 'idle',
    list: [],
    error: null
  },
  history: {
    list: [],
    index: 0
  },
  cast: {
    status: 'idle',
    list: [],
    error: null
  },
  actorFilms: {
    status: 'idle',
    list: [],
    error: null
  },
  movieDetails: {
    status: 'idle',
    data: {},
    error: null
  },
  actorDetails: {
    status: 'idle',
    data: {},
    error: null
  },
  alert: {
    open: false,
    title: '',
    text: ''
  }
}

// Reducer
function reducer (state, action) {
  switch (action.type) {
    case UPDATE_MOVIES_HOME: {
      const { newMoviesData } = action.payload
      return {
        ...state,
        home: {
          ...state.home,
          movies: newMoviesData
        }
      }
    }
    case UPDATE_ERROR_MOVIES_HOME: {
      return {
        ...state,
        home: {
          ...state.home,
          movies: {
            ...state.home.movies,
            ...action.payload
          }
        }
      }
    }
    case UPDATE_MOVIES_SEARCH: {
      const { newMoviesData } = action.payload
      return {
        ...state,
        search: {
          ...state.search,
          movies: newMoviesData
        }
      }
    }
    case UPDATE_ERROR_MOVIES_SEARCH: {
      return {
        ...state,
        search: {
          ...state.search,
          movies: {
            ...state.search.movies,
            ...action.payload
          }
        }
      }
    }
    case ADD_MOVIES: {
      const { newMoviesData } = action.payload
      return {
        ...state,
        search: {
          ...state.search,
          movies: newMoviesData
        }
      }
    }
    case RESET_MOVIES: {
      const { mode } = action.payload
      return {
        ...state,
        [mode]: {
          ...state[mode],
          movies: {
            ...state[mode].movies,
            list: []
          }
        }
      }
    }
    case LOAD_MOVIES: {
      const { mode } = action.payload
      return {
        ...state,
        [mode]: {
          ...state[mode],
          movies: {
            ...state[mode].movies,
            status: 'pending'
          }
        }
      }
    }
    case UPDATE_ACTOR_FILMS: {
      const { newActorFilms } = action.payload
      return {
        ...state,
        actorFilms: newActorFilms
      }
    }
    case LOAD_ACTOR_FILMS: {
      return {
        ...state,
        actorFilms: {
          list: [],
          status: 'pending',
          error: null
        }
      }
    }
    case UPDATE_GENRES: {
      return {
        ...state,
        genres: action.payload
      }
    }
    case LOAD_GENRES: {
      return {
        ...state,
        genres: {
          ...state.genres,
          status: 'pending'
        }
      }
    }
    case UPDATE_ERROR_GENRES: {
      return {
        ...state,
        genres: {
          ...state.genres,
          ...action.payload
        }
      }
    }
    case UPDATE_HISTORY: {
      return {
        ...state,
        history: action.payload
      }
    }
    case UPDATE_CAST: {
      return {
        ...state,
        cast: action.payload
      }
    }
    case LOAD_CAST: {
      return {
        ...state,
        cast: {
          list: [],
          status: 'pending',
          error: null
        }
      }
    }
    case UPDATE_MOVIE_DETAILS: {
      return {
        ...state,
        movieDetails: action.payload
      }
    }
    case LOAD_MOVIE_DETAILS: {
      return {
        ...state,
        movieDetails: {
          data: {},
          status: 'pending',
          error: null
        }
      }
    }
    case UPDATE_ERROR_MOVIES_DETAILS: {
      return {
        ...state,
        movieDetails: {
          ...state.movieDetails,
          ...action.payload
        }
      }
    }
    case UPDATE_ACTOR_DETAILS: {
      return {
        ...state,
        actorDetails: action.payload
      }
    }
    case LOAD_ACTOR_DETAILS: {
      return {
        ...state,
        actorDetails: {
          data: {},
          status: 'pending',
          error: null
        }
      }
    }
    case UPDATE_ERROR_ACTOR_DETAILS: {
      return {
        ...state,
        actorDetails: {
          ...state.actorDetails,
          ...action.payload
        }
      }
    }
    case UPDATE_ALERT: {
      return {
        ...state,
        alert: action.payload
      }
    }
    case CLOSE_ALERT: {
      return {
        ...state,
        alert: {
          open: false,
          title: '',
          text: ''
        }
      }
    }
    default: {
      return state
    }
  }
}

// Provider context
export function MyProvider ({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <MyContext.Provider value={{ state, dispatch }}>
      {children}
    </MyContext.Provider>
  )
}

// Hook
export function useMyContext () {
  return useContext(MyContext)
}
