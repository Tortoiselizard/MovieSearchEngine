import PropTypes from 'prop-types'

import styles from './HeroActorDetails.module.css'

const { VITE_API_IMAGE_URL } = import.meta.env

export default function HeroActorDetails ({ actor }) {
  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <div className={styles.heroBackground}>
          <img
            src={`${VITE_API_IMAGE_URL}/w1280/${actor.backdrop_path}`}
            alt={actor.title}
            className={styles.backgroundImage}
          />
          <div className={styles.heroGradient} />
        </div>
        <div className={styles.heroContent}>
          <div className={styles.heroInfo}>
            <h1 className={styles.title}>{actor.title}</h1>

            <div className={styles.metadata}>
              <span className={styles.rating}>{actor.vote_average}</span>
              <span className={styles.year}>{actor.release_date.split('-')[0]}</span>
            </div>

            <p className={styles.description}>{actor.overview}</p>

            <div className={styles.genres}>
              {
              actor.genres.map(({ name, id }) => (
                <span key={id} className={styles.genre}>{name}</span>
              ))
            }
            </div>
          </div>

          <div className={styles.heroPoster}>
            <img
              src={`${VITE_API_IMAGE_URL}/w500/${actor.poster_path}`}
              alt={'image: ' + actor.title}
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

HeroActorDetails.propTypes = {
  actor: PropTypes.object.isRequired
}
