import Grid from '../Grid/Grid.jsx'
import MovieCard from '../MovieCard/MovieCard'
import Spinner from '../Spinner/Spinner.jsx'

import { useMyContext } from '../../context/MyContext'
import { useState, useEffect, useRef } from 'react'
import { addMovies } from '../../context/actions.js'
import { requestMovies } from '../../services/moviesApi'

import styles from './FullDataMovies.module.css'

export default function FullDataMovies () {
  const { state: globalState, dispatch } = useMyContext()
  const { search, mode } = globalState
  const movies = useRef(search.movies)
  const [loadingNextPage, setLoadingNextPage] = useState(false)

  // Update movies
  useEffect(() => {
    movies.current = globalState.search.movies
  }, [globalState.search.movies])

  async function getMore () {
    const { category, moviesPerPage: quantity, lastMovie: indexMovie, page, lastPage: lastPagePrev } = movies.current
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
        category,
        page,
        lastMovie,
        ...(lastPage ? { lastPage } : {}),
        moviesPerPage: quantity,
        filters: { ...movies.current.filters }
      }
      dispatch(addMovies({ currentMoviesData: movies.current.list, newMoviesData, mode }))
      setLoadingNextPage(false)
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <div className={styles.fullDataContainer}>
      {
          globalState[mode].movies.status === 'pending'
            ? (
              <Spinner />
              )
            : globalState[mode].movies.status === 'fail'
              ? (
                <p>Error: {globalState[mode].movies.error}</p>
                )
              : globalState[mode].movies.status === 'successful'
                ? (
                    globalState[mode].movies.list.length
                      ? (
                        <Grid items={globalState[mode].movies.list} getMoreItems={getMore} loadingNextPage={loadingNextPage}>
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
