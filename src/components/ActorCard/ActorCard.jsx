import PropTypes from 'prop-types'
import Link from '../Link/Link.jsx'
import LazyImage from '../LazyImage/LazyImage.jsx'

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

  return (
    <Link
      className={`${styles.actorCardContainer} ${true ? styles.actorCardRow : styles.actorCardGrid} ${data.poster_path && loading ? '' : styles.spinnerOff}`}
      to={`/actors/${data.id}`}
    >
      {
        !data.profile_path
          ? (
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
            )
          : (
            <LazyImage
              className={styles.actorCardImage}
              src={`${VITE_API_IMAGE_URL}${imageSize}${data.profile_path}`}
              alt={data.name}
              onLoad={handleImageLoad}
              onError={handleImageError}
            />
            )

      }
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
