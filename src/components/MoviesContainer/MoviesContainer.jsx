import MovieCard from '../MovieCard/MovieCard'

import PropTypes from 'prop-types'

export default function MoviesContainer ({ moviesList }) {
  return (
    <div>
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
                        moviesList.list.map(movie => (
                          <MovieCard key={movie.id} movie={movie} />
                        ))
                      )
                    : (
                      <p>No se han encontrado coincidencias</p>
                      )
                )
              : null
      }
    </div>
  )
}

MoviesContainer.propTypes = {
  moviesList: PropTypes.array.isRequired
}
