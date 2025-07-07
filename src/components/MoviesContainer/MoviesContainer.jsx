import MovieCard from '../MovieCard/MovieCard'

import PropTypes from 'prop-types'

export default function MoviesContainer ({ moviesList }) {
  return (
    <div>
      {
        moviesList.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))
      }
    </div>
  )
}

MoviesContainer.propTypes = {
  moviesList: PropTypes.array.isRequired
}
