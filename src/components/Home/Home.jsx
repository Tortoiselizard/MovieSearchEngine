import MoviesContainer from '../MoviesContainer/MoviesContainer'
import HeroBanner from '../HeroBanner/HeroBanner.jsx'
import FullData from '../FullData/FullData.jsx'
import Spinner from '../Spinner/Spinner.jsx'

import { useEffect } from 'react'
import { useMyContext } from '../../context/MyContext.jsx'
import { updateMovies, loadMovies } from '../../context/actions.js'
import { requestPopularMovies } from '../../services/moviesApi'

import styles from './Home.module.css'

export default function Home () {
  const { state: globalState, dispatch } = useMyContext()
  const { mode } = globalState

  // Get popular movies
  useEffect(() => {
    if (mode !== 'home') return
    const { category, page } = globalState[mode].movies
    switch (category) {
      case 'idle': {
        getPopularMovies()
        break
      }
      case 'popular': {
        if (page === 1) return
        getPopularMovies()
        break
      }
    }
  }, [mode])

  async function getPopularMovies () {
    const widthViewport = window.innerWidth
    const quantity = widthViewport < 480 ? 18 : 20
    const { page: currentPage } = globalState[mode].movies
    dispatch(loadMovies({ mode }))
    try {
      const { page, lastMovie, results } = await requestPopularMovies({ page: currentPage, quantity })
      dispatch(updateMovies({
        newMoviesData: {
          list: results,
          category: 'popular',
          page,
          lastMovie,
          moviesPerPage: quantity
        },
        mode
      }))
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <>
      {
        globalState.mode === 'home'
          ? (
              globalState.home.movies.status === 'pending'
                ? (
                  <Spinner />
                  )
                : globalState.home.movies.status === 'fail'
                  ? (
                    <p>Error</p>
                    )
                  : globalState.home.movies.status === 'successful'
                    ? (
                        globalState.home.movies.list.length
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
            )
          : globalState.mode === 'search'
            ? (
              <>
                <FullData />
              </>
              )
            : null
      }
    </>
  )
}
