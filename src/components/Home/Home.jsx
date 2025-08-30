import MoviesContainer from '../MoviesContainer/MoviesContainer'
import HeroBanner from '../HeroBanner/HeroBanner.jsx'
import Spinner from '../Spinner/Spinner.jsx'

import { useEffect } from 'react'
import { useMyContext } from '../../context/MyContext.jsx'
import { updateMoviesHome, loadMovies, updateAlert } from '../../context/actions.js'
import { requestPopularMovies } from '../../services/moviesApi'

import styles from './Home.module.css'

export default function Home () {
  const { state: globalState, dispatch } = useMyContext()
  const { movies } = globalState.home

  // Get popular movies
  useEffect(() => {
    if (movies.status !== 'idle') return
    getPopularMovies()
  }, [])

  async function getPopularMovies () {
    const widthViewport = window.innerWidth
    const quantity = widthViewport < 480 ? 18 : 20
    const { page: currentPage } = movies
    dispatch(loadMovies({ mode: 'home' }))
    try {
      const { page, lastMovie, results } = await requestPopularMovies({ page: currentPage, quantity })
      dispatch(updateMoviesHome({
        newMoviesData: {
          list: results,
          page,
          lastMovie,
          moviesPerPage: quantity
        }
      }))
    } catch (error) {
      dispatch(updateAlert({
        open: true,
        title: 'Error',
        text: 'Something is wrong'
      }))
    }
  }

  return (
    <>
      {
        movies.status === 'pending'
          ? (
            <Spinner />
            )
          : movies.status === 'fail'
            ? (
              <p>Error</p>
              )
            : movies.status === 'successful'
              ? (
                  movies.list.length
                    ? (
                      <div className={styles.container}>
                        <HeroBanner />
                        <MoviesContainer />
                      </div>
                      )
                    : (
                      <p>No Matches Found</p>
                      )
                )
              : null
      }
    </>
  )
}
