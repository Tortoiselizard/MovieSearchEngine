import { ChevronDown } from 'lucide-react'

import styles from './GenreSelector.module.css'
import { useEffect, useRef, useState } from 'react'
import { useMyContext } from '../../context/MyContext'
import { useMatch } from 'react-router'

import { requestPopularMovies, requestMovieGenre, requestMovies } from '../../services/moviesApi'

import { updateMovies, loadMovies, loadGenres, updateGenres } from '../../context/actions'

export default function GenreSelector () {
  const isHome = useMatch('/')
  if (!isHome) return
  const { state: globalState, dispatch } = useMyContext()
  const { home, mode, genres } = globalState
  const genreSelectorRef = useRef()
  const [isOpen, setIsOpen] = useState(false)
  const [selectedGenre, setSelectedGenre] = useState(() => {
    if (genres.status === 'successful' && genres.list.length) return genres.list[0]
    return null
  })

  // Initialice genres
  useEffect(() => {
    if (genres.status !== 'idle') return
    getGenreMovies()
  }, [])

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
      const list = [{ id: 0, name: 'All genders' }, ...genres]
      dispatch(updateGenres({
        list,
        status: 'successful',
        error: null
      }))
      const newSelectedGenre = list[0]
      setSelectedGenre(newSelectedGenre)
    } catch (error) {
      alert(error.message)
      dispatch(updateGenres({
        list: [],
        status: 'fail',
        error: error.message
      }))
    }
  }

  function handleGenreSelected (genre) {
    setSelectedGenre(genre)
    if (genre.name === 'All genders') {
      getPopularMovies()
    } else {
      getLeakedMovies(genre)
    }
    setIsOpen(false)
  }

  async function getLeakedMovies (genre) {
    const quantity = home.movies.moviesPerPage
    dispatch(loadMovies({ mode }))
    const filters = {
      ...(globalState[mode].movies.filters || {}),
      genre: genre.id
    }
    try {
      const { page, results, lastMovie, lastPage } = await requestMovies({
        page: 1,
        lastPage: 0,
        quantity,
        ...filters
      })
      dispatch(updateMovies({
        newMoviesData: {
          list: results,
          category: 'popular',
          page,
          lastMovie,
          ...(lastPage ? { lastPage } : {}),
          moviesPerPage: quantity,
          filters
        },
        mode
      }))
    } catch (error) {
      alert(error.message)
    }
  }

  async function getPopularMovies () {
    const widthViewport = window.innerWidth
    const quantity = widthViewport < 480 ? 18 : 20
    dispatch(loadMovies({ mode }))
    try {
      const { page, results, lastMovie, lastPage } = await requestPopularMovies({
        page: 1,
        quantity,
        lastMovie: 0
      })
      dispatch(updateMovies({
        newMoviesData: {
          list: results,
          category: 'popular',
          page,
          ...(lastPage ? { lastPage } : {}),
          lastMovie,
          moviesPerPage: quantity
        },
        mode
      }))
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <>
      {
        genres.status === 'pending' || genres.status === 'fail'
          ? null
          : genres.status === 'successful' && selectedGenre
            ? (
                genres.list.length
                  ? (
                    <div className={styles.genreSelector} ref={genreSelectorRef}>
                      <button
                        className={styles.selectorButton}
                        onClick={() => setIsOpen(!isOpen)}
                        aria-expanded={isOpen}
                        aria-haspopup='listbox'
                      >
                        <span className={styles.selectedGenre}>{selectedGenre.name}</span>
                        <ChevronDown className={styles.chevron} />
                      </button>

                      {
                        isOpen && (
                          <div className={styles.dropDown}>
                            <ul className={styles.genreList} role='listbox'>
                              {
                                genres.list.map(genre => (
                                  <li key={genre.id}>
                                    <button
                                      className={`${styles.genreOption} ${selectedGenre.id === genre.id ? styles.selected : ''}`}
                                      onClick={() => { handleGenreSelected(genre) }}
                                      role='option'
                                      aria-selected={selectedGenre.id === genre.id}
                                    >
                                      {genre.name}
                                    </button>
                                  </li>

                                ))

                              }
                            </ul>
                          </div>
                        )
                      }
                    </div>
                    )
                  : (
                    <p>No Genres found</p>
                    )
              )
            : null
      }
    </>
  )
}
