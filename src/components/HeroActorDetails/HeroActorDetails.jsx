import PropTypes from 'prop-types'

import Rating from '../Rating/Rating'

import { ImageIcon } from 'lucide-react'

import { useState } from 'react'

import styles from './HeroActorDetails.module.css'

const { VITE_API_IMAGE_URL } = import.meta.env

export default function HeroActorDetails ({ actor }) {
  const [loadingBackground, setLoadingBackground] = useState(true)
  const [loadingPoster, setLoadingPoster] = useState(true)

  function handleImageLoad (image) {
    switch (image) {
      case 'poster': {
        setLoadingPoster(false)
        break
      }
      case 'background': {
        setLoadingBackground(false)
      }
    }
  }

  function handleImageError (image) {
    switch (image) {
      case 'poster': {
        setLoadingPoster(false)
        break
      }
      case 'background': {
        setLoadingBackground(false)
      }
    }
  }

  return (
    <div className={styles.heroActorDetailsContainer}>
      <div className={styles.hero}>
        <div className={`${styles.heroBackground} ${loadingBackground ? '' : styles.spinnerOff}`}>
          {
            actor.profile_path
              ? (
                <img
                  src={`${VITE_API_IMAGE_URL}/h632/${actor.profile_path}`}
                  alt={actor.name}
                  className={styles.backgroundImage}
                  onLoad={() => { handleImageLoad('background') }}
                  onError={() => { handleImageError('background') }}
                />
                )
              : (
                <div
                  className={styles.posterImage}
                />
                )
          }
          <div className={styles.heroGradient} />
        </div>
        <div className={styles.heroContent}>
          <div className={styles.heroInfo}>
            <div className={styles.headHeroInfo}>
              <h1 className={styles.name}>{actor.name}</h1>
              <Rating rating={actor.popularity} />
            </div>
            <div className={styles.metadata}>
              {
                actor.birthday && <span className={styles.specialDate}>{actor.birthday}</span>
              }

              {
                actor.deathday && (
                  <>
                    -<span className={styles.specialDate}>{actor.deathday}</span>
                  </>
                )
              }

              {
                actor.place_of_birth && <span className={styles.placeBirth}>{actor.place_of_birth}</span>
              }

            </div>

            <p className={styles.biography}>{actor.biography}</p>
          </div>

          <div className={`${styles.heroPosterContainer}`}>
            <div className={`${styles.heroPoster} ${actor.profile_path && loadingPoster ? '' : styles.spinnerOff}`}>
              {
                actor.profile_path
                  ? (
                    <img
                      src={`${VITE_API_IMAGE_URL}/h632/${actor.profile_path}`}
                      alt={actor.name}
                      className={styles.posterImage}
                      onLoad={() => { handleImageLoad('poster') }}
                      onError={() => { handleImageError('poster') }}
                    />
                    )
                  : (
                    <div
                      className={styles.posterImage}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '8px',
                        backgroundColor: 'rgba(36,36,36,0.5)'
                      }}
                    >
                      <ImageIcon />
                      <p>Image not found</p>
                    </div>
                    )
              }
              <div className={styles.heroGradientPoster} />
            </div>
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
