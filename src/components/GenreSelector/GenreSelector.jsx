import { ChevronDown } from 'lucide-react'

import styles from './GenreSelector.module.css'
import { useEffect, useRef, useState } from 'react'
import { useMyContext } from '../../context/MyContext'

import { requestPopularMovies, requestMovieGenre, requestLeakedMovies } from '../../services/moviesApi'

import { updateMovies, loadMovies } from '../../context/actions'

export default function GenreSelector () {
  const { state: globalState, dispatch } = useMyContext()
  const { movies } = globalState.home
  const genreSelectorRef = useRef()
  const [isOpen, setIsOpen] = useState(false)
  const [selectedGenre, setSelectedGenre] = useState(null)
  const [genres, setGenres] = useState({
    status: 'idle',
    list: [],
    error: null
  })

  // Initialice genres
  useEffect(() => {
    getGenreMovies()
  }, [])

  // Update selectedGenre
  useEffect(() => {
    if (!genres.list.length) return
    const newSelectedGenre = genres.list[0]
    setSelectedGenre(newSelectedGenre)
  }, [genres])

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
    setGenres((prevState) => ({
      ...prevState,
      status: 'pending'
    }))
    try {
      const { genres } = await requestMovieGenre()
      const list = [{ id: 0, name: 'All genders' }, ...genres]
      setGenres({
        status: 'successful',
        list,
        error: null
      })
    } catch (error) {
      alert(error.message)
      setGenres({
        status: 'fail',
        list: [],
        error: error.message
      })
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
    const quantity = movies.moviesPerPage
    dispatch(loadMovies())
    try {
      const { page, results, total_pages, total_results } = await requestLeakedMovies({
        with_genres: genre.id,
        page: 1,
        quantity
      })
      dispatch(updateMovies({ list: results, category: 'popular', page, totalPages: total_pages, total_results, moviesPerPage: quantity }))
    } catch (error) {
      alert(error.message)
    }
  }

  async function getPopularMovies () {
    const widthViewport = window.innerWidth
    const quantity = widthViewport < 480 ? 18 : 20
    dispatch(loadMovies())
    try {
      const { page, results, total_pages, total_results } = await requestPopularMovies({ page: 1, quantity })
      dispatch(updateMovies({ list: results, category: 'popular', page, totalPages: total_pages, total_results, moviesPerPage: quantity }))
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
