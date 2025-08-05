import { createContext, useContext, useReducer } from 'react'
import { UPDATE_MOVIES, LOAD_MOVIES, UPDATE_MODE } from './actions'

// Make context
const MyContext = createContext()

// Initial state
const initialState = {
  movies: {
    list: [],
    status: 'idle',
    error: null,
    category: 'idle',
    page: 1,
    totalPages: 1
  },
  mode: 'summary'
}

// Reducer
function reducer (state, action) {
  switch (action.type) {
    case UPDATE_MOVIES: {
      return { ...state, movies: action.payload }
    }
    case LOAD_MOVIES: {
      return {
        ...state,
        movies: {
          ...state.movies,
          status: 'pending'
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
