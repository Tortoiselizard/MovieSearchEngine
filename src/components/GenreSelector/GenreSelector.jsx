import { ChevronDown } from 'lucide-react'

import styles from './GenreSelector.module.css'
import { useEffect, useRef, useState } from 'react'
import { useMyContext } from '../../context/MyContext'
import { useMatch } from 'react-router'

import { requestPopularMovies, requestMovieGenre, requestLeakedMovies } from '../../services/moviesApi'

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
    try {
      const { page, results, total_pages, total_results } = await requestLeakedMovies({
        with_genres: genre.id,
        page: 1,
        quantity
      })
      dispatch(updateMovies({
        newMoviesData: {
          list: results,
          category: 'popular',
          page,
          totalPages: total_pages,
          total_results,
          moviesPerPage: quantity
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
      const { page, results, total_pages, total_results } = await requestPopularMovies({ page: 1, quantity })
      if (mode === 'home') {
        dispatch(updateMovies({
          newMoviesData: {
            list: results,
            category: 'popular',
            page,
            totalPages: total_pages,
            total_results,
            moviesPerPage: quantity
          },
          mode
        }))
      } else if (mode === 'search') {

      }
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <>
      {
        genres.status === 'pending'
          ? (
            <p>Cargando...</p>
            )
          : genres.status === 'fail'
            ? (
              <p>Error: {genres.error}</p>
              )
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
