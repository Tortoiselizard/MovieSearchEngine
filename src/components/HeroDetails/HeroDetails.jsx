import PropTypes from 'prop-types'

import HeartButton from '../HeartButton/HeartButton'

import { ImageIcon } from 'lucide-react'

import { useState } from 'react'

import styles from './HeroDetails.module.css'

const { VITE_API_IMAGE_URL } = import.meta.env

export default function HeroDetails ({ movie }) {
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
    <div className={styles.container}>
      <div className={styles.hero}>
        <div className={`${styles.heroBackground} ${loadingBackground ? '' : styles.spinnerOff}`}>
          {
            movie.backdrop_path
              ? (
                <img
                  src={`${VITE_API_IMAGE_URL}/w1280/${movie.backdrop_path}`}
                  alt={movie.title}
                  className={styles.backgroundImage}
                  onLoad={() => { handleImageLoad('background') }}
                  onError={() => { handleImageError('background') }}
                />
                )
              : (
                <div className={styles.backgroundImage} />
                )
          }
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
              <HeartButton movie={movie} />
            </div>
          </div>

          <div className={`${styles.heroPoster} ${movie.poster_path && loadingPoster ? '' : styles.spinnerOff}`}>
            {
              movie.poster_path
                ? (
                  <img
                    src={`${VITE_API_IMAGE_URL}/w500/${movie.poster_path}`}
                    alt={movie.title}
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
      <div className={styles.fadeBottom} />
    </div>
  )
}

HeroDetails.propTypes = {
  movie: PropTypes.object.isRequired
}
