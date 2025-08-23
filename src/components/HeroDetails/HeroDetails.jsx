import PropTypes from 'prop-types'

import HeartButton from '../HeartButton/HeartButton'

import styles from './HeroDetails.module.css'

const { VITE_API_IMAGE_URL } = import.meta.env

export default function HeroDetails ({ movie }) {
  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <div className={styles.heroBackground}>
          <img
            src={`${VITE_API_IMAGE_URL}/w1280/${movie.backdrop_path}`}
            alt={movie.title}
            className={styles.backgroundImage}
          />
          <div className={styles.heroGradient} />
        </div>
        <div className={styles.heroContent}>
          <div className={styles.heroInfo}>
            <h1 className={styles.title}>{movie.title}</h1>

            <div className={styles.metadata}>
              <span className={styles.rating}>{movie.vote_average}</span>
              <span className={styles.year}>{movie.release_date.split('-')[0]}</span>
            </div>

            <p className={styles.description}>{movie.overview}</p>

            <div className={styles.genres}>
              {
                movie.genres.map(({ name, id }) => (
                  <span key={id} className={styles.genre}>{name}</span>
                ))
              }
            </div>
            <HeartButton movieId={movie.id} />
          </div>

          <div className={styles.heroPoster}>
            <img
              src={`${VITE_API_IMAGE_URL}/w500/${movie.poster_path}`}
              alt={'image: ' + movie.title}
              className={styles.posterImage}
            />
            <div className={styles.heroGradientPoster} />
          </div>
        </div>
      </div>
      <div className={styles.fadeBottom} />
    </div>
  )
}

HeroDetails.propTypes = {
  movie: PropTypes.object.isRequired
}
