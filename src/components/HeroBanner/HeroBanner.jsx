import PropTypes from 'prop-types'
import styles from './HeroBanner.module.css'

export default function HeroBanner ({ movie }) {
  const { VITE_API_IMAGE_URL } = import.meta.env

  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <h1 className={styles.title}>{movie.title}</h1>
        <p className={styles.description}>{movie.overview}</p>
        <div>
          <button>More Info</button>
        </div>
      </div>
      <div className={styles.heroImage}>
        <img src={`${VITE_API_IMAGE_URL}/w1280/${movie.backdrop_path}`} alt={movie.title} />
      </div>
      <div className={styles.fadeBottom} />
    </section>
  )
}

HeroBanner.propTypes = {
  movie: PropTypes.object.isRequired
}
