import PropTypes from 'prop-types'
import { Link } from 'react-router'

export default function MovieCard ({ movie }) {
  const { VITE_API_IMAGE_URL } = import.meta.env

  return (
    <div>
      <Link to={`/${movie.id}`}>
        <p>{movie.title}</p>
        <img src={`${VITE_API_IMAGE_URL}/w500/${movie.poster_path}`} alt={'image: ' + movie.title} />
        <p>{movie.release_date}</p>
      </Link>
    </div>
  )
}

MovieCard.propTypes = {
  movie: PropTypes.object.isRequired
}
