import SearchBar from '../SearchBar/SearchBar'
import MoviesContainer from '../MoviesContainer/MoviesContainer'
import HeroBanner from '../HeroBanner/HeroBanner.jsx'

import { useState, useEffect } from 'react'
import { requestPopularMovies, requestMoviesByTitle } from '../../services/moviesApi'

import styles from './Home.module.css'

export default function Home () {
  const { VITE_API_IMAGE_URL } = import.meta.env
  const [moviesList, setMoviesList] = useState({
    status: 'idle',
    list: [],
    error: null
  })
  const [backgroundStyles, setBackgroundStyles] = useState({
    // backgroundImage: `url(${VITE_API_IMAGE_URL}/w1280/nKyBbFSooRPTJVqjrDteD1lF733.jpg})`
    backgroundImage: ''
  })

  useEffect(() => {
    getPopularMovies()
  }, [])

  useEffect(() => {
    console.log('moviesList:', moviesList)
  }, [moviesList])

  useEffect(() => {
    console.log('backgroundStyles:', backgroundStyles)
  }, [backgroundStyles])

  useEffect(() => {
    if (!moviesList.list.length) return
    setBackgroundStyles({
      backgroundImage: `url(${VITE_API_IMAGE_URL}/w1280/${moviesList.list[0].backdrop_path})`
    })
  }, [moviesList])

  async function getPopularMovies () {
    setMoviesList(prevState => ({
      ...prevState,
      status: 'pending'
    }))
    try {
      const { page, results, total_pages, total_results } = await requestPopularMovies()
      setMoviesList({
        list: results,
        status: 'successful',
        error: null
      })
    } catch (error) {
      alert(error.message)
    }
  }

  async function getMoviesByTitle (text) {
    setMoviesList(prevState => ({
      ...prevState,
      status: 'pending'
    }))
    try {
      const { page, results, total_pages, total_results } = await requestMoviesByTitle({
        text
      })
      setMoviesList({
        list: results,
        status: 'successful',
        error: null
      })
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <>
      {/* <SearchBar getMoviesByTitle={getMoviesByTitle} /> */}
      {
        moviesList.status === 'pending'
          ? (
            <p>Cargando...</p>
            )
          : moviesList.status === 'fail'
            ? (
              <p>Error</p>
              )
            : moviesList.status === 'successful'
              ? (
                  moviesList.list.length
                    ? (
                      <div className={styles.container} style={backgroundStyles}>
                        <HeroBanner movie={moviesList.list[0]} />
                        <MoviesContainer moviesList={moviesList.list.slice(1)} />
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
