import PropTypes from 'prop-types'

const { VITE_API_IMAGE_URL } = import.meta.env

export default function MovieCardDetails ({ movie }) {
  return (
    <div>
      <img src={`${VITE_API_IMAGE_URL}/w500/${movie.poster_path}`} alt={'image: ' + movie.title} />
      <p>{movie.title}</p>
      <p>{movie.overview}</p>
      <p>{movie.vote_average}</p>
      <p>{movie.release_date}</p>
      {
        movie.genres.map(({ id, name }) => (
          <p key={id}>{name}</p>
        ))
      }
    </div>
  )
}

MovieCardDetails.propTypes = {
  movie: PropTypes.object.isRequired
}
