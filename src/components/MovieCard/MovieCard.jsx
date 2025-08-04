import PropTypes from 'prop-types'
import { Link } from 'react-router'

import { useMyContext } from '../../context/MyContext'

import { ImageIcon } from 'lucide-react'

import styles from './MovieCard.module.css'

export default function MovieCard ({ movie }) {
  const { VITE_API_IMAGE_URL } = import.meta.env
  const { state: globalState } = useMyContext()
  const { mode } = globalState

  const imageSize = mode === 'fullData' ? '/w342' : '/w185'

  if (!movie.poster_path) {
    return (
      <div
        className={`${styles.movieCard} ${mode === 'summary' ? styles.movieCardRow : styles.movieCardGrid}`}
        style={{ cursor: 'not-allowed' }}
      >
        <div
          className={styles.movieCardImage}
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: 'rgba(0,0,0,0.5)'
          }}
        >
          <ImageIcon />
          <p>Image not found</p>
        </div>
        <div className={styles.movieInfo}>
          <p className={styles.title}>{movie.title}</p>
          <p className={styles.release_date}>{movie.release_date}</p>
        </div>
      </div>
    )
  }

  return (
    <Link className={`${styles.movieCard} ${mode === 'summary' ? styles.movieCardRow : styles.movieCardGrid}`} to={`/${movie.id}`}>
      <img className={styles.movieCardImage} src={`${VITE_API_IMAGE_URL}${imageSize}${movie.poster_path}`} alt={movie.title} />
      <div className={styles.movieInfo}>
        <p className={styles.title}>{movie.title}</p>
        <p className={styles.release_date}>{movie.release_date}</p>
      </div>
    </Link>
  )
}

MovieCard.propTypes = {
  movie: PropTypes.object.isRequired
}
