import MovieCard from '../MovieCard/MovieCard'

import PropTypes from 'prop-types'

export default function MoviesContainer ({ moviesList }) {
  return (
    <div>
      <h2>The Most Popular</h2>
      <div>
        {
          moviesList.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))
        }
      </div>
    </div>
  )
}

MoviesContainer.propTypes = {
  moviesList: PropTypes.array.isRequired
}
