import { ChevronDown } from 'lucide-react'

import styles from './GenreSelector.module.css'
import { useEffect, useState } from 'react'
import { useMyContext } from '../../context/MyContext'

import { requestMovieGenre, requestLeakedMovies } from '../../services/moviesApi'

import { updateMovies, loadMovies } from '../../context/actions'

export default function GenreSelector () {
  const { state: globalState, dispatch } = useMyContext()
  const { movies } = globalState
  const [isOpen, setIsOpen] = useState(false)
  const [selectedGenre, setSelectedGenre] = useState(null)
  const [genres, setGenres] = useState({
    status: 'idle',
    list: [],
    error: null
  })

  // Initialice genres
  useEffect(() => {
    console.log('obteniendo los diferentes géneros')
    getGenreMovies()
  }, [])

  // Update selectedGenre
  useEffect(() => {
    if (!genres.list.length) return
    const newSelectedGenre = genres.list[0]
    setSelectedGenre(newSelectedGenre)
  }, [genres])

  async function getGenreMovies () {
    setGenres((prevState) => ({
      ...prevState,
      status: 'pending'
    }))
    try {
      console.log('entrndo en el try')
      const { genres } = await requestMovieGenre()
      const list = [{ name: 'All genders' }, ...genres]
      console.log('list:', list)
      setGenres({
        status: 'successful',
        list,
        error: null
      })
    } catch (error) {
      console.log('algo salió mal')
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
    getLeakedMovies(genre)
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
                      <div className={styles.genreSelector}>
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
