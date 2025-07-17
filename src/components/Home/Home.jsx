import MoviesContainer from '../MoviesContainer/MoviesContainer'
import HeroBanner from '../HeroBanner/HeroBanner.jsx'

import { useEffect } from 'react'
import { useMyContext } from '../../context/MyContext.jsx'
import { updateMovies, loadMovies } from '../../context/actions.js'
import { requestPopularMovies, requestMoviesByTitle } from '../../services/moviesApi'

import styles from './Home.module.css'

export default function Home () {
  const { state: globalState, dispatch } = useMyContext()
  const { movies } = globalState

  // Get popular movies
  useEffect(() => {
    getPopularMovies()
  }, [])

  async function getPopularMovies () {
    dispatch(loadMovies())
    try {
      const { page, results, total_pages, total_results } = await requestPopularMovies()
      dispatch(updateMovies(results))
    } catch (error) {
      alert(error.message)
    }
  }

  async function getMoviesByTitle (text) {
    dispatch(loadMovies())
    try {
      const { page, results, total_pages, total_results } = await requestMoviesByTitle({
        text
      })
      dispatch(updateMovies(results))
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <>
      {
        movies.status === 'pending'
          ? (
            <p>Cargando...</p>
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
                      <p>No se han encontrado coincidencias</p>
                      )
                )
              : null
      }
    </>
  )
}
