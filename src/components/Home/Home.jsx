import MoviesContainer from '../MoviesContainer/MoviesContainer'
import HeroBanner from '../HeroBanner/HeroBanner.jsx'
import FullData from '../FullData/FullData.jsx'

import { useEffect } from 'react'
import { useMyContext } from '../../context/MyContext.jsx'
import { updateMovies, loadMovies } from '../../context/actions.js'
import { requestPopularMovies, requestMoviesByTitle, requestLeakedMovies } from '../../services/moviesApi'

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
      case 'search': {
        if (page === 1) return
        getMoviesByTitle()
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
      const { page, results, total_pages, total_results } = await requestPopularMovies({ page: currentPage, quantity })
      dispatch(updateMovies({
        newMoviesData: {
          list: results,
          category: 'popular',
          page,
          totalPages: total_pages,
          total_results,
          moviesPerPage: quantity
        },
        mode
      }))
    } catch (error) {
      alert(error.message)
    }
  }

  async function getMoviesByTitle () {
    const quantity = globalState[mode].moviesPerPage
    const query = globalState[mode].title
    try {
      const { page, results, total_pages, total_results } = await requestMoviesByTitle({
        query,
        page: 1,
        quantity
      })
      dispatch(updateMovies({
        newMoviesData: {
          list: results,
          category: 'search',
          title: query,
          page,
          totalPages: total_pages,
          total_results,
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
        globalState[mode].movies.status === 'pending'
          ? (
            <p>Cargando...</p>
            )
          : globalState[mode].movies.status === 'fail'
            ? (
              <p>Error</p>
              )
            : globalState[mode].movies.status === 'successful'
              ? (
                  globalState[mode].movies.list.length
                    ? (
                      <div className={styles.container}>
                        {
                          mode === 'home'
                            ? (
                              <>
                                <HeroBanner />
                                <MoviesContainer />
                              </>
                              )
                            : mode === 'search'
                              ? (
                                <>
                                  <FullData />
                                </>
                                )
                              : null
                        }
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
