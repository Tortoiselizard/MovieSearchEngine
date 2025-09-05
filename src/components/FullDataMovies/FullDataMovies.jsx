import Grid from '../Grid/Grid.jsx'
import MovieCard from '../MovieCard/MovieCard'
import Spinner from '../Spinner/Spinner.jsx'
import Error from '../Error/Error.jsx'

import { useMyContext } from '../../context/MyContext'
import { useState, useEffect, useRef, useMemo } from 'react'
import { useSearchParams } from 'react-router'
import toast from 'react-hot-toast'

import { addMovies, updateMoviesSearch, loadMovies, updateAlert, updateErrorMoviesSearch, loadGenres, updateGenres, updateErrorGenres } from '../../context/actions.js'
import { requestMovies, requestMovieGenre } from '../../services/moviesApi'
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

  // Get genres
  useEffect(() => {
    if (genres.status === 'successful') return
    dispatch(loadMovies({ mode: 'search' }))
    getGenreMovies()
  }, [])

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
    let screen, quantity
    if (widthViewport > 970) { screen = 'computer' } else if (widthViewport < 970 && widthViewport > 480) { screen = 'tablet' } else { screen = 'movile' }
    switch (screen) {
      case 'movile': {
        quantity = 18
        break
      }
      case 'tablet': {
        quantity = 20
        break
      }
      case 'computer': {
        quantity = 20
        break
      }
      default: {
        quantity = 20
        break
      }
    }
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
      dispatch(updateErrorMoviesSearch(error.message))
      toast.error('Error getting when searching for movies')
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
      dispatch(updateErrorMoviesSearch(error.message))
      toast.error('Error searching for more movies')
    }
  }

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
    } catch (error) {
      dispatch(updateErrorGenres(error.message))
      toast.error('Error getting movie genres')
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
              <Error message={searchMovies.error} />
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
                      <p>No Matches Found</p>
                      )
                )
              : null
      }
    </div>
  )
}
