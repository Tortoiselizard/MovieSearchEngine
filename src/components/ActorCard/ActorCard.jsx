import PropTypes from 'prop-types'
import { Link } from 'react-router'

import { ImageIcon } from 'lucide-react'

import styles from './ActorCard.module.css'
import { useState } from 'react'

export default function ActorCard ({ data, imageSize }) {
  const { VITE_API_IMAGE_URL } = import.meta.env
  const [loading, setLoading] = useState(true)

  function handleImageLoad () {
    setLoading(false)
  }

  function handleImageError () {
    setLoading(false)
  }

  if (!data.profile_path) {
    return (
      <div
        className={`${styles.actorCardContainer} ${true ? styles.actorCardRow : styles.actorCardGrid} ${styles.spinnerOff}`}
        style={{ cursor: 'not-allowed' }}
      >
        <div
          className={styles.actorCardImage}
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
        <div className={styles.actorInfo}>
          <p className={styles.name}>{data.name}</p>
        </div>
      </div>
    )
  }

  return (
    <Link
      className={`${styles.actorCardContainer} ${true ? styles.actorCardRow : styles.actorCardGrid} ${loading ? '' : styles.spinnerOff}`}
      to={`/actors/${data.id}`}
    >
      <img
        className={styles.actorCardImage}
        src={`${VITE_API_IMAGE_URL}${imageSize}${data.profile_path}`}
        alt={data.name}
        onLoad={handleImageLoad}
        onError={handleImageError}
        style={{ display: loading ? 'none' : 'block' }}
      />
      <div className={styles.actorInfo}>
        <p className={styles.name}>{data.name}</p>
      </div>
    </Link>
  )
}

ActorCard.propTypes = {
  data: PropTypes.object.isRequired,
  imageSize: PropTypes.string.isRequired
}
