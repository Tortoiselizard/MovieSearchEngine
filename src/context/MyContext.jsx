import { createContext, useContext, useReducer } from 'react'
import { UPDATE_MOVIES, LOAD_MOVIES, UPDATE_MODE } from './actions'

// Make context
const MyContext = createContext()

// Initial state
const initialState = {
  home: {
    movies: {
      status: 'idle',
      error: null,
      list: [],
      category: 'idle',
      page: 1,
      totalPages: 1
    }
  },
  search: {
    movies: {
      status: 'idle',
      error: null,
      list: [],
      category: 'idle',
      page: 1,
      totalPages: 1
    }
  },
  mode: 'home'
}

// Reducer
function reducer (state, action) {
  switch (action.type) {
    case UPDATE_MOVIES: {
      const { newMoviesData, mode } = action.payload
      return {
        ...state,
        [mode]: {
          ...state[mode],
          movies: newMoviesData
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
