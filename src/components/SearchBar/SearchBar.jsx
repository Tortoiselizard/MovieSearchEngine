import PropTypes from 'prop-types'
import { useState } from 'react'

export default function SearchBar ({ getMoviesByTitle }) {
  const [input, setInput] = useState('')

  function handleChange (event) {
    const newValue = event.target.value
    setInput(newValue)
  }

  function handleClick () {
    getMoviesByTitle(input)
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
