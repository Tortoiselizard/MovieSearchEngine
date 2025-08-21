import PropTypes from 'prop-types'

import styles from './HeroActorDetails.module.css'

const { VITE_API_IMAGE_URL } = import.meta.env

export default function HeroActorDetails ({ actor }) {
  return (
    <div className={styles.heroActorDetailsContainer}>
      <div className={styles.hero}>
        <div className={styles.heroBackground}>
          <img
            src={`${VITE_API_IMAGE_URL}/h632/${actor.profile_path}`}
            alt={actor.name}
            className={styles.backgroundImage}
          />
          <div className={styles.heroGradient} />
        </div>
        <div className={styles.heroContent}>
          <div className={styles.heroInfo}>
            <h1 className={styles.name}>{actor.name}</h1>

            <div className={styles.metadata}>
              <span className={styles.specialDate}>{actor.birthday}</span>
              {
                actor.deathday && (
                  <>
                    -<span className={styles.specialDate}>{actor.deathday}</span>
                  </>
                )
              }

              <span className={styles.placeBirth}>{actor.place_of_birth}</span>

            </div>

            <p className={styles.biography}>{actor.biography}</p>

            <span className={styles.popularity}>{actor.popularity}</span>

          </div>

          <div className={styles.heroPoster}>
            <img
              src={`${VITE_API_IMAGE_URL}/h632/${actor.profile_path}`}
              alt={'image: ' + actor.name}
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
