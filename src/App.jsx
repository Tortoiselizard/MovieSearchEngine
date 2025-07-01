import SearchBar from './components/SearchBar/SearchBar'
import MoviesContainer from './components/MoviesContainer/MoviesContainer'

import './App.css'
import { useEffect, useState } from 'react'

import { requestPopularMovies, requestMoviesByTitle } from './services/moviesApi'

function App () {
  const [moviesList, setMoviesList] = useState({
    status: 'idle',
    list: [],
    error: null
  })

  useEffect(() => {
    getPopularMovies()
  }, [])

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
      <SearchBar getMoviesByTitle={getMoviesByTitle} />
      <MoviesContainer moviesList={moviesList} />
    </>
  )
}

export default App
