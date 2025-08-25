import Grid from '../Grid/Grid.jsx'
import MovieCard from '../MovieCard/MovieCard'
import Spinner from '../Spinner/Spinner.jsx'

import { useMyContext } from '../../context/MyContext'
import { useState, useEffect, useRef } from 'react'
import { useSearchParams } from 'react-router'

import { addMovies, updateMoviesSearch, loadMovies } from '../../context/actions.js'
import { requestMovies } from '../../services/moviesApi'

import styles from './FullDataMovies.module.css'

export default function FullDataMovies () {
  const { state: globalState, dispatch } = useMyContext()
  const searchMovies = globalState.search.movies
  const [searchParams] = useSearchParams()
  const movies = useRef(searchMovies)
  const [loadingNextPage, setLoadingNextPage] = useState(false)

  // Get movies
  useEffect(() => {
    if (searchMovies.status !== 'idle') return
    const filters = Object.fromEntries(searchParams.entries())
    getMovies(filters)
  }, [])

  // Update movies
  useEffect(() => {
    movies.current = searchMovies
  }, [searchMovies])

  async function getMovies (filters) {
    const widthViewport = window.innerWidth
    const quantity = widthViewport < 480 ? 18 : 20
    const { page: currentPage } = searchMovies
    dispatch(loadMovies({ mode: 'search' }))
    try {
      const { page, lastMovie, results } = await requestMovies({ page: currentPage, quantity, ...filters })
      dispatch(updateMoviesSearch({
        newMoviesData: {
          list: results,
          page,
          lastMovie,
          moviesPerPage: quantity,
          filters
        }
      }))
    } catch (error) {
      alert(error.message)
    }
  }

  async function getMore () {
    const { moviesPerPage: quantity, lastMovie: indexMovie, page, lastPage: lastPagePrev } = movies.current
    if (lastPagePrev) return
    const newPage = page + (indexMovie ? 0 : 1)
    setLoadingNextPage(true)
    try {
      const { page, lastMovie, results, lastPage } = await requestMovies({
        page: newPage,
        lastMovie: indexMovie,
        quantity,
        ...movies.current.filters,
        currentMovies: movies.current.list.map(movie => movie.id)
      })
      const newMoviesData = {
        list: [...results],
        page,
        lastMovie,
        ...(lastPage ? { lastPage } : {}),
        moviesPerPage: quantity,
        filters: { ...movies.current.filters }
      }
      dispatch(addMovies({ currentMoviesData: movies.current.list, newMoviesData }))
      setLoadingNextPage(false)
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <div className={styles.fullDataContainer}>
      {
        searchMovies.status === 'pending'
          ? (
            <Spinner />
            )
          : searchMovies.status === 'fail'
            ? (
              <p>Error: {searchMovies.error}</p>
              )
            : searchMovies.status === 'successful'
              ? (
                  searchMovies.list.length
                    ? (
                      <Grid items={searchMovies.list} getMoreItems={getMore} loadingNextPage={loadingNextPage}>
                        <MovieCard mode='search' />
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
