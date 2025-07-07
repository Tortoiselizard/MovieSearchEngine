import SearchBar from '../SearchBar/SearchBar'
import MoviesContainer from '../MoviesContainer/MoviesContainer'

import { useState, useEffect } from 'react'
import { requestPopularMovies, requestMoviesByTitle } from '../../services/moviesApi'

export default function Home () {
  const [moviesList, setMoviesList] = useState({
    status: 'idle',
    list: [],
    error: null
  })

  useEffect(() => {
    getPopularMovies()
  }, [])

  useEffect(() => {
    console.log('moviesList:', moviesList)
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
                      <MoviesContainer moviesList={moviesList.list.slice(1)} />
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
