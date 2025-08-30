import Grid from '../Grid/Grid.jsx'
import MovieCard from '../MovieCard/MovieCard'
import Spinner from '../Spinner/Spinner.jsx'

import { useState, useEffect } from 'react'

import styles from './Favorites.module.css'

export default function Favorites () {
  const [movies, setMovies] = useState({
    status: 'idle',
    list: [],
    error: null
  })
  const [loadingNextPage, setLoadingNextPage] = useState(false)

  // Update movies
  useEffect(() => {
    if (movies.status !== 'idle') return
    getMovies()
  }, [])

  async function getMovies () {
    setMovies({
      status: 'pending',
      list: [],
      error: null
    })
    const favoritesString = localStorage.getItem('favorites')
    if (!favoritesString) {
      setMovies({
        status: 'successful',
        list: [],
        error: null
      })
      return
    }

    const favorites = JSON.parse(favoritesString)
    const list = [...favorites]
    setMovies({
      status: 'successful',
      list,
      error: null
    })
  }

  async function getMore () {
  }

  return (
    <div className={styles.fullDataContainer}>
      {
          movies.status === 'pending'
            ? (
              <Spinner />
              )
            : movies.status === 'fail'
              ? (
                <p>Error: {movies.error}</p>
                )
              : movies.status === 'successful'
                ? (
                    movies.list.length
                      ? (
                        <Grid items={movies.list} getMoreItems={getMore} loadingNextPage={loadingNextPage}>
                          <MovieCard />
                        </Grid>
                        )
                      : (
                        <p>No Matches Found</p>
                        )
                  )
                : null
        }
    </div>
  )
}
