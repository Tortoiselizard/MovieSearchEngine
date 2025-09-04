import PropTypes from 'prop-types'

import { Search, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router'

import styles from './SearchBar.module.css'

export default function SearchBar ({ expand, mode }) {
  const [query, setQuery] = useState('')
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const inputNode = useRef()
  const [isExpanded, setIsExpanded] = useState(expand || false)
  const searchRef = useRef(null)

  // Update initial query
  useEffect(() => {
    let newQuery = searchParams.get('text')
    if (!newQuery) {
      newQuery = ''
    }
    setQuery(newQuery)
    if (!newQuery) {
      setIsExpanded(false)
    } else {
      setIsExpanded(true)
    }
  }, [searchParams])

  // handle clicks outside the component
  useEffect(() => {
    function handleClickOutside (event) {
      if (searchRef.current && !searchRef.current.contains(event.target) && !inputNode.current.value) {
        setIsExpanded(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Search movies when you press enter key
  useEffect(() => {
    function handleEnter (event) {
      const { value } = inputNode.current
      if (event.key !== 'Enter' || !value) return
      getMoviesByTitle(value)
    }

    const input = document.querySelector('#search-input')
    input.addEventListener('keypress', handleEnter)
    return () => {
      input.removeEventListener('keypress', handleEnter)
    }
  }, [pathname, query])

  function handleChange (event) {
    const newValue = event.target.value
    setQuery(newValue)
  }

  function handleClick () {
    if (!isExpanded) {
      setIsExpanded(true)
      const input = document.querySelector('#search-input')
      input.focus()
      return
    }

    const { value } = inputNode.current
    if (!value) return
    getMoviesByTitle(value)
  }

  async function getMoviesByTitle (text) {
    searchParams.set('text', text)
    if (pathname !== '/search') {
      navigate(`/search?${searchParams.toString()}`)
      return
    }

    setSearchParams(searchParams)
  }

  function handleClear () {
    setQuery('')
    setIsExpanded(false)
  }

  return (
    <div className={`${styles.searchBox} ${mode === 'button' ? styles.modeButton : styles.modeGeneral} ${isExpanded ? styles.expanded : ''}`} ref={searchRef}>
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
        ref={inputNode}
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
  )
}

SearchBar.propTypes = {
  expand: PropTypes.bool.isRequired,
  mode: PropTypes.string.isRequired
}
