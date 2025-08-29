import Grid from '../Grid/Grid.jsx'
import MovieCard from '../MovieCard/MovieCard'
import Spinner from '../Spinner/Spinner.jsx'

import { useMyContext } from '../../context/MyContext'
import { useState, useEffect, useRef, useMemo } from 'react'
import { useSearchParams } from 'react-router'

import { addMovies, updateMoviesSearch, loadMovies } from '../../context/actions.js'
import { requestMovies } from '../../services/moviesApi'
import { deepEqual } from '../../libs/validations.js'

import styles from './FullDataMovies.module.css'

export default function FullDataMovies () {
  const { state: globalState, dispatch } = useMyContext()
  const { search, genres } = globalState
  const searchMovies = search.movies
  const [searchParams] = useSearchParams()
  const movies = useRef(searchMovies)
  const [loadingNextPage, setLoadingNextPage] = useState(false)
  const filters = useMemo(() => {
    if (genres.status !== 'successful') return
    const filters = Object.fromEntries(searchParams.entries())
    if (filters.genre) {
      filters.genre = genres.list.find(({ name }) => name === filters.genre).id
    }
    return filters
  }, [searchParams, genres])

  // Get movies
  useEffect(() => {
    if (genres.status !== 'successful' || deepEqual(filters, searchMovies.filters)) return
    getMovies()
  }, [genres.status, searchParams])

  // Update movies
  useEffect(() => {
    movies.current = searchMovies
  }, [searchMovies])

  async function getMovies () {
    const widthViewport = window.innerWidth
    const quantity = widthViewport < 480 ? 18 : 20
    dispatch(loadMovies({ mode: 'search' }))
    try {
      const { page, lastMovie, results } = await requestMovies({
        page: 1,
        lastMovie: 0,
        quantity,
        ...filters,
        currentMovies: []
      })
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
        ...filters,
        currentMovies: movies.current.list.map(movie => movie.id)
      })
      const newMoviesData = {
        list: [...results],
        page,
        lastMovie,
        ...(lastPage ? { lastPage } : {}),
        moviesPerPage: quantity,
        filters
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
