import { createContext, useContext, useReducer } from 'react'
import { UPDATE_MOVIES_HOME, UPDATE_MOVIES_SEARCH, ADD_MOVIES, RESET_MOVIES, LOAD_MOVIES, UPDATE_MODE, LOAD_GENRES, UPDATE_GENRES } from './actions'

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
    case UPDATE_MODE: {
      return {
        ...state,
        mode: action.payload
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
