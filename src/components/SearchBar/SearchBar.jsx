import PropTypes from 'prop-types'
import { useState } from 'react'
import { useMyContext } from '../../context/MyContext.jsx'

import { updateMovies } from '../../context/actions'
import { requestMoviesByTitle } from '../../services/moviesApi.js'

export default function SearchBar () {
  const [input, setInput] = useState('')
  const { dispatch } = useMyContext()

  function handleChange (event) {
    const newValue = event.target.value
    setInput(newValue)
  }

  function handleClick () {
    getMoviesByTitle(input)
  }

  async function getMoviesByTitle (text) {
    try {
      const { page, results, total_pages, total_results } = await requestMoviesByTitle({
        text
      })
      dispatch(updateMovies(results))
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <div>
      <input
        value={input}
        onChange={handleChange}
      />
      <button
        onClick={handleClick}
      >Search
      </button>
    </div>
  )
}

SearchBar.propTypes = {
  getMoviesByTitle: PropTypes.func.isRequired
}
