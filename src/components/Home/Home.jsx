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
  const { home } = globalState

  // Get popular movies
  useEffect(() => {
    const { category, page } = home.movies
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
  }, [home.mode])

  async function getPopularMovies () {
    const widthViewport = window.innerWidth
    const quantity = widthViewport < 480 ? 18 : 20
    dispatch(loadMovies())
    try {
      const { page, results, total_pages, total_results } = await requestPopularMovies({ page: 1, quantity })
      dispatch(updateMovies({ list: results, category: 'popular', page, totalPages: total_pages, total_results, moviesPerPage: quantity }))
    } catch (error) {
      alert(error.message)
    }
  }

  async function getMoviesByTitle () {
    const quantity = home.moviesPerPage
    const query = home.title
    try {
      const { page, results, total_pages, total_results } = await requestMoviesByTitle({
        query,
        page: 1,
        quantity
      })
      dispatch(updateMovies({ list: results, category: 'search', title: query, page, totalPages: total_pages, total_results, moviesPerPage: quantity }))
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <>
      {
        home.movies.status === 'pending'
          ? (
            <p>Cargando...</p>
            )
          : home.movies.status === 'fail'
            ? (
              <p>Error</p>
              )
            : home.movies.status === 'successful'
              ? (
                  home.movies.list.length
                    ? (
                      <div className={styles.container}>
                        {
                          home.mode === 'home'
                            ? (
                              <>
                                <HeroBanner />
                                <MoviesContainer />
                              </>
                              )
                            : home.mode === 'search'
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
