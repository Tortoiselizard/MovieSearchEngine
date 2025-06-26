import PropTypes from 'prop-types'

export default function MoviesContainer ({ moviesList }) {
  return (
    <div>
      {
        moviesList.map(movie => (
          <label key={movie.id}>Soy una película</label>
        ))
      }
    </div>
  )
}

MoviesContainer.propTypes = {
  moviesList: PropTypes.array.isRequired
}
