import SearchBar from './components/SearchBar/SearchBar'
import MoviesContainer from './components/MoviesContainer/MoviesContainer'

import './App.css'
import { useEffect, useState } from 'react'

import { getPopularMovies } from './services/moviesApi'

function App () {
  const [moviesList, setMoviesList] = useState([])

  useEffect(() => {
    getMovies()
  }, [])

  async function getMovies () {
    try {
      const { page, results, total_pages, total_results } = await getPopularMovies()
      setMoviesList(results)
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <>
      <SearchBar />
      <MoviesContainer moviesList={moviesList} />
    </>
  )
}

export default App
