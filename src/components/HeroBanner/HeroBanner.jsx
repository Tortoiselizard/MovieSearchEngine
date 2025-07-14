import PropTypes from 'prop-types'
import styles from './HeroBanner.module.css'

export default function HeroBanner ({ movie }) {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{movie.title}</h1>
      <p className={styles.overview}>{movie.overview}</p>
    </div>
  )
}

HeroBanner.propTypes = {
  movie: PropTypes.object.isRequired
}
