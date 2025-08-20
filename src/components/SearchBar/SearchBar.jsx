import { Search, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useMyContext } from '../../context/MyContext.jsx'
import { useMatch } from 'react-router'

import { updateMovies, updateMode, loadMovies } from '../../context/actions'
import { requestMovies } from '../../services/moviesApi.js'

import styles from './SearchBar.module.css'

export default function SearchBar () {
  const isHome = useMatch('/')
  if (!isHome) return
  const [query, setQuery] = useState('')
  const { state: globalState, dispatch } = useMyContext()
  const { mode } = globalState
  const movies = useRef(globalState[mode].movies)
  const [isExpanded, setIsExpanded] = useState(false)
  const searchRef = useRef(null)
  const queryRef = useRef(query)

  // Update movies value
  useEffect(() => {
    movies.current = globalState[mode].movies
  }, [globalState[mode].movies])

  // handle clicks outside the component
  useEffect(() => {
    function handleClickOutside (event) {
      if (searchRef.current && !searchRef.current.contains(event.target) && !queryRef.current) {
        setIsExpanded(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Search movies when you press enter key
  useEffect(() => {
    function handleEnter (event) {
      if (event.key !== 'Enter' || !queryRef.current) return
      getMoviesByTitle(queryRef.current)
    }

    const input = document.querySelector('#search-input')
    input.addEventListener('keypress', handleEnter)
    return () => {
      input.removeEventListener('keypress', handleEnter)
    }
  }, [])

  function handleChange (event) {
    const newValue = event.target.value
    setQuery(newValue)
    queryRef.current = newValue
  }

  function handleClick () {
    if (!isExpanded) {
      setIsExpanded(true)
      const input = document.querySelector('#search-input')
      input.focus()
      return
    }
    if (!queryRef.current) return
    getMoviesByTitle(queryRef.current)
  }

  async function getMoviesByTitle (title) {
    dispatch(loadMovies({ mode: 'search' }))
    dispatch(updateMode('search'))
    const quantity = movies.current.moviesPerPage || 20
    const filters = {
      title,
      ...movies.current.filters
    }
    try {
      const { page, results, lastMovie, lastPage } = await requestMovies({
        page: 1,
        quantity,
        lastMovie: 0,
        ...filters
      })
      dispatch(updateMovies({
        newMoviesData: {
          list: results,
          category: 'search',
          page,
          lastMovie,
          ...(lastPage ? { lastPage } : {}),
          moviesPerPage: quantity,
          filters
        },
        mode: 'search'
      }))
    } catch (error) {
      alert(error.message)
    }
  }

  function handleClear () {
    setQuery('')
    setIsExpanded(false)
  }

  return (
    <div className={styles.searchContainer} ref={searchRef}>
      <div className={`${styles.searchBox} ${isExpanded ? styles.expanded : ''}`}>
        <button
          onClick={() => { handleClick() }}
          className={styles.searchButton}
          aria-label='Search'
        >
          <Search className={styles.searchIcon} />
        </button>
        <input
          id='search-input'
          type='text'
          value={query}
          onChange={handleChange}
          placeholder='Titles'
          className={`${styles.searchInput} ${isExpanded ? styles.visible : ''}`}
        />

        {
          query && isExpanded && (
            <button
              className={styles.clearButton}
              onClick={handleClear}
              aria-label='Clean search'
            >
              <X className={styles.clearIcon} />
            </button>
          )
        }
      </div>
    </div>
  )
}
