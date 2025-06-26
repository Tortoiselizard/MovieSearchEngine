import SearchBar from './components/SearchBar/SearchBar'
import MoviesContainer from './components/MoviesContainer/MoviesContainer'

import './App.css'
import { useEffect, useState } from 'react'

function App () {
  const [moviesList, setMoviesList] = useState([])
  const apiUrl = import.meta.env.VITE_API_URL

  return (
    <>
      <SearchBar />
      <MoviesContainer moviesList={moviesList} />
    </>
  )
}

export default App
