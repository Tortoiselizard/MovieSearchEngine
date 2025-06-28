import PropTypes from 'prop-types'

export default function MovieCard ({ movie }) {
  const { VITE_API_IMAGE_URL } = import.meta.env

  return (
    <div>
      <p>{movie.title}</p>
      <img src={`${VITE_API_IMAGE_URL}/w500/${movie.poster_path}`} alt={movie.title} />
      <p>{movie.release_date}</p>
    </div>
  )
}

MovieCard.propTypes = {
  movie: PropTypes.object.isRequired
}
