import SearchBar from './components/SearchBar/SearchBar'
import MoviesContainer from './components/MoviesContainer/MoviesContainer'

import './App.css'
import { useEffect, useState } from 'react'

import { requestPopularMovies, requestMoviesByTitle } from './services/moviesApi'

function App () {
  const [moviesList, setMoviesList] = useState([])

  useEffect(() => {
    getPopularMovies()
  }, [])

  async function getPopularMovies () {
    try {
      const { page, results, total_pages, total_results } = await requestPopularMovies()
      setMoviesList(results)
    } catch (error) {
      alert(error.message)
    }
  }

  async function getMoviesByTitle (text) {
    try {
      const { page, results, total_pages, total_results } = await requestMoviesByTitle({
        text
      })
      setMoviesList(results)
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
