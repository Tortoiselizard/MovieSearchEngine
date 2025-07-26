import PropTypes from 'prop-types'

import { Search, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useMyContext } from '../../context/MyContext.jsx'
import { useMatch } from 'react-router'

import { updateMovies } from '../../context/actions'
import { requestMoviesByTitle } from '../../services/moviesApi.js'

import styles from './SearchBar.module.css'

export default function SearchBar () {
  const isHome = useMatch('/')
  if (!isHome) return
  const [query, setQuery] = useState('')
  const { dispatch } = useMyContext()
  const [isExpanded, setIsExpanded] = useState(false)
  const searchRef = useRef(null)
  const queryRef = useRef(query)

  // handle clicks outside the component
  useEffect(() => {
    function handleClickOutside (event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
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

  async function getMoviesByTitle (query) {
    try {
      const { page, results, total_pages, total_results } = await requestMoviesByTitle({
        query
      })
      dispatch(updateMovies({ list: results, category: 'search' }))
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
          arial-label='Search'
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

SearchBar.propTypes = {
  getMoviesByTitle: PropTypes.func.isRequired
}
