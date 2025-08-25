import Grid from '../Grid/Grid.jsx'
import MovieCard from '../MovieCard/MovieCard'
import Spinner from '../Spinner/Spinner.jsx'

import { useState, useEffect } from 'react'
import { requestMoviesById } from '../../services/moviesApi'

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
    const list = []
    for (const id of favorites) {
      try {
        const response = await requestMoviesById(id)
        list.push(response)
      } catch (error) {
        setMovies({
          status: 'error',
          list: [],
          error: error.message
        })
        alert(error.message)
      }
    }

    setMovies({
      status: 'successful',
      list,
      error: null
    })
  }

  async function getMore () {
    // const { category, moviesPerPage: quantity, lastMovie: indexMovie, page, lastPage: lastPagePrev } = movies.current
    // if (lastPagePrev) return
    // const newPage = page + (indexMovie ? 0 : 1)
    // setLoadingNextPage(true)
    // try {
    // const { page, lastMovie, results, lastPage } = await requestMovies({
    // page: newPage,
    // lastMovie: indexMovie,
    // quantity,
    // ...movies.current.filters
    // })
    // const newList = [...movies.current.list, ...results]
    // const newMoviesData = {
    // list: newList,
    // category,
    // page,
    // lastMovie,
    // ...(lastPage ? { lastPage } : {}),
    // moviesPerPage: quantity,
    // filters: { ...movies.current.filters }
    // }
    // dispatch(addMovies({ newMoviesData, mode }))
    // setLoadingNextPage(false)
    // } catch (error) {
    // alert(error.message)
    // }
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
                        <p>No se han encontrado coincidencias</p>
                        )
                  )
                : null
        }
    </div>
  )
}
