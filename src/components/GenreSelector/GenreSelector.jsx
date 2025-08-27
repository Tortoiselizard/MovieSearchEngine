import { ChevronDown } from 'lucide-react'

import styles from './GenreSelector.module.css'
import { useEffect, useRef, useState } from 'react'
import { useMyContext } from '../../context/MyContext'
import { useLocation, useNavigate, useSearchParams } from 'react-router'

import { requestMovieGenre } from '../../services/moviesApi'

import { loadGenres, updateGenres } from '../../context/actions'

export default function GenreSelector () {
  const { state: globalState, dispatch } = useMyContext()
  const { genres } = globalState
  const { pathname } = useLocation()
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
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
    upteGenreFilter(genre)
    setIsOpen(false)
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
                                      disabled={selectedGenre.id === genre.id}
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
