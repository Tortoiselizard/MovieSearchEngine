import PropTypes from 'prop-types'
import { Link } from 'react-router'

import styles from './MovieCard.module.css'

export default function MovieCard ({ movie }) {
  const { VITE_API_IMAGE_URL } = import.meta.env

  return (
    <div className={styles.container}>
      <Link to={`/${movie.id}`}>
        <img className={styles.img} src={`${VITE_API_IMAGE_URL}/w185/${movie.poster_path}`} alt={'image: ' + movie.title} />
        {/* <img src={`${VITE_API_IMAGE_URL}/w500/${movie.backdrop_path}`} alt={'image: ' + movie.title} /> */}
        <p className={styles.title}>{movie.title}</p>
        <p className={styles.release_date}>{movie.release_date}</p>
      </Link>
    </div>
  )
}

MovieCard.propTypes = {
  movie: PropTypes.object.isRequired
}
