import PropTypes from 'prop-types'

import Spinner from '../Spinner/Spinner'
import Error from '../Error/Error'

import { ChevronDown, Film } from 'lucide-react'

import { useEffect, useRef, useState } from 'react'
import { useMyContext } from '../../context/MyContext'
import { useLocation, useNavigate, useSearchParams } from 'react-router'
import toast from 'react-hot-toast'

import { requestMovieGenre } from '../../services/moviesApi'
import { loadGenres, updateAlert, updateGenres, updateErrorGenres, updateFAB } from '../../context/actions'

import styles from './GenreSelector.module.css'

export default function GenreSelector ({ mode }) {
  const { state: globalState, dispatch } = useMyContext()
  const { genres, fab } = globalState
  const { pathname } = useLocation()
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const genreSelectorRef = useRef()
  const dropDownRef = useRef()
  const [isOpen, setIsOpen] = useState(false)
  const [isExpanded, setIsExpanded] = useState(mode !== 'button')
  const [selectedGenre, setSelectedGenre] = useState({ id: 0, name: 'All genres' })
  const [stylesDropDown, setStylesDropDown] = useState({})

  // Update selectedGenre with URL
  useEffect(() => {
    if (genres.status !== 'successful') return
    const genreName = searchParams.get('genre')
    let newSelectedGenre
    if (!genreName) {
      newSelectedGenre = genres.list[0]
    } else {
      newSelectedGenre = genres.list.find(({ name }) => name === genreName)
    }
    setSelectedGenre(newSelectedGenre)
  }, [searchParams])

  // Initialice genres
  useEffect(() => {
    if (!isOpen || genres.status !== 'idle') return
    getGenreMovies()
  }, [isOpen])

  // handle clicks outside the component
  useEffect(() => {
    function handleClickOutside (event) {
      if (genreSelectorRef.current && !genreSelectorRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  async function getGenreMovies () {
    dispatch(loadGenres())
    try {
      const { genres } = await requestMovieGenre()
      const list = [{ id: 0, name: 'All genres' }, ...genres]
      dispatch(updateGenres({
        list,
        status: 'successful',
        error: null
      }))
      let newSelectedGenre
      if (searchParams.has('genre')) {
        const genreName = searchParams.get('genre')
        newSelectedGenre = list.find(genre => genre.name === genreName)
      } else {
        newSelectedGenre = list[0]
      }
      setSelectedGenre(newSelectedGenre)
    } catch (error) {
      dispatch(updateErrorGenres(error.message))
      toast.error('Error getting movie genres')
    }
  }

  function handleGenreSelected (genre) {
    setSelectedGenre(genre)
    upteGenreFilter(genre)
    setIsOpen(false)
    dispatch(updateFAB(false))
  }

  async function upteGenreFilter ({ name }) {
    searchParams.set('genre', name)

    if (name === 'All genres') {
      searchParams.delete('genre')
    }

    if (pathname !== '/search') {
      navigate(`/search?${searchParams.toString()}`)
      return
    }
    setSearchParams(searchParams)
  }

  function handleExpanded () {
    if (mode !== 'button') return
    setIsExpanded(true)
  }

  function handleOpen () {
    const newIsOpen = !isOpen
    setIsOpen(newIsOpen)
    if (!newIsOpen) return
    const { y, x } = dropDownRef.current.getBoundingClientRect()
    const heightViewport = window.innerHeight
    const enoughYSpace = y + 300 < heightViewport
    const enoughXSpace = x > 0
    let newStylesDropDown
    if (enoughYSpace && enoughXSpace) {
      newStylesDropDown = {
        top: '100%',
        right: '0',
        marginTop: '4px'
      }
    } else if (!enoughYSpace && enoughXSpace) {
      newStylesDropDown = {
        bottom: '100%',
        right: '0',
        marginBottom: '4px'
      }
    } else if (enoughYSpace && !enoughXSpace) {
      newStylesDropDown = {
        top: '100%',
        left: '0',
        marginTop: '4px'
      }
    } else if (!enoughYSpace && !enoughXSpace) {
      newStylesDropDown = {
        bottom: '100%',
        left: '0',
        marginBottom: '4px'
      }
    }
    setStylesDropDown(newStylesDropDown)
  }

  return (
    <div
      className={`${styles.genreSelector} ${mode === 'button' ? styles.modeButton : styles.modeGeneral} ${isExpanded ? styles.expanded : ''}`} ref={genreSelectorRef}
      onClick={handleExpanded}
    >
      {!isExpanded && <Film />}
      <button
        className={`${styles.selectorButton} ${isExpanded ? styles.expanded : ''}`}
        onClick={handleOpen}
        aria-expanded={isOpen}
        aria-haspopup='listbox'
      >
        <span className={styles.selectedGenre}>{selectedGenre.name}</span>
        <ChevronDown className={`${styles.chevron} ${isOpen ? styles.open : ''}`} />
      </button>

      <div
        className={`${styles.dropDown} ${isOpen ? styles.open : ''}`}
        ref={dropDownRef}
        style={stylesDropDown}
      >
        <ul className={`${styles.genreList} ${isOpen ? styles.open : ''}`} role='listbox'>
          {
                genres.status === 'pending'
                  ? (
                    <Spinner />
                    )
                  : genres.status === 'fail'
                    ? (
                      <Error message={movies.error} />
                      )
                    : genres.status === 'successful'
                      ? (
                          genres.list.map(genre => (
                            <li key={genre.id}>
                              <button
                                className={`${styles.genreOption} ${selectedGenre.id === genre.id ? styles.selected : ''}`}
                                onClick={() => { handleGenreSelected(genre) }}
                                role='option'
                                aria-selected={selectedGenre.id === genre.id}
                                disabled={selectedGenre.id === genre.id}
                              >
                                {genre.name}
                              </button>
                            </li>
                          ))
                        )
                      : null
              }
        </ul>
      </div>
    </div>
  )
}

GenreSelector.propTypes = {
  mode: PropTypes.string.isRequired
}
