import MovieCard from '../MovieCard/MovieCard'
import Carousel from '../Carousel/Carousel'
import Spinner from '../Spinner/Spinner'

import { useState, useMemo, useEffect } from 'react'
import { useParams } from 'react-router'

import { requestFilmsActor } from '../../services/moviesApi'

import styles from './FilmsActorContainer.module.css'

export default function FilmsActorContainer () {
  const { id } = useParams()
  const [movies, setMovies] = useState({
    status: 'idle',
    list: [],
    error: null
  })
  const imageSize = useMemo(() => {
    const viewportWidth = window.innerWidth
    if (viewportWidth < 480) return '/w185'
    else return '/h632'
  }, [])

  useEffect(() => {
    if (movies.status !== 'idle') return
    getMovies()
  }, [])

  async function getMovies () {
    setMovies(prevState => ({
      ...prevState,
      status: 'pending'
    }))
    try {
      const newMovies = await requestFilmsActor(id)
      setMovies({
        list: newMovies,
        status: 'successful',
        error: null
      })
    } catch (error) {
      setMovies({
        list: [],
        status: 'fail',
        error: error.message
      })
    }
  }

  return (
    <div className={styles.moviesContainer}>
      {
        movies.status === 'pending'
          ? (
            <div className={styles.loadingContainer}>
              <Spinner />
            </div>
            )
          : movies.status === 'fail'
            ? (
              <p>Error: {movies.error}</p>
              )
            : movies.status === 'successful'
              ? (
                  movies.list.length
                    ? (
                      <Carousel items={movies.list} title='Cast' seeMore='/' id='cast' imageSize={imageSize}>
                        <MovieCard />
                      </Carousel>
                      )
                    : null
                )
              : null
      }
    </div>
  )
}
