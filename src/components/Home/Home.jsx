import MoviesContainer from '../MoviesContainer/MoviesContainer'
import HeroBanner from '../HeroBanner/HeroBanner.jsx'
import Spinner from '../Spinner/Spinner.jsx'
import Error from '../Error/Error.jsx'
import Slides from '../Slides/Slides.jsx'

import { useEffect } from 'react'
import { useMyContext } from '../../context/MyContext.jsx'
import toast from 'react-hot-toast'

import { updateMoviesHome, loadMovies, updateErrorMoviesHome } from '../../context/actions.js'
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
      dispatch(updateErrorMoviesHome(error.message))
      toast.error('Error getting popular movies')
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
              <Error message={movies.error} />
              )
            : movies.status === 'successful'
              ? (
                  movies.list.length
                    ? (
                      <div className={styles.container}>

                        <Slides items={movies.list.slice(0, 5)}>
                          <HeroBanner />
                        </Slides>
                        <MoviesContainer />
                      </div>
                      )
                    : (
                      <div>
                        <p>No Matches Found</p>
                      </div>
                      )
                )
              : null
      }
    </>
  )
}
