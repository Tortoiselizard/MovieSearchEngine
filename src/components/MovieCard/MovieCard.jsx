import PropTypes from 'prop-types'
import Link from '../Link/Link.jsx'
import LazyImage from '../LazyImage/LazyImage.jsx'

import { ImageIcon } from 'lucide-react'

import styles from './MovieCard.module.css'
import { useState } from 'react'

export default function MovieCard ({ data, imageSize, mode }) {
  const { VITE_API_IMAGE_URL } = import.meta.env
  const [loading, setLoading] = useState(true)

  function handleImageLoad () {
    setLoading(false)
  }

  function handleImageError () {
    setLoading(false)
  }

  if (!data.poster_path) {
    return (
      <div
        className={`${styles.movieCard} ${mode === 'home' ? styles.movieCardRow : styles.movieCardGrid} ${styles.spinnerOff}`}
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
          <p className={styles.title}>{data.title}</p>
          <p className={styles.release_date}>{data.release_date}</p>
        </div>
      </div>
    )
  }

  return (
    <Link
      className={`${styles.movieCard} ${mode === 'home' ? styles.movieCardRow : styles.movieCardGrid} ${loading ? '' : styles.spinnerOff}`}
      to={`/movies/${data.id}`}
    >
      <LazyImage
        className={styles.movieCardImage}
        src={`${VITE_API_IMAGE_URL}${imageSize}${data.poster_path}`}
        alt={data.title}
        onLoad={handleImageLoad}
        onError={handleImageError}
      />
      <div className={styles.movieInfo}>
        <p className={styles.title}>{data.title}</p>
        <p className={styles.release_date}>{data.release_date}</p>
      </div>
    </Link>
  )
}

MovieCard.propTypes = {
  data: PropTypes.object.isRequired,
  imageSize: PropTypes.string.isRequired,
  mode: PropTypes.string.isRequired
}
