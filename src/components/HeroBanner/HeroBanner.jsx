import Link from '../Link/Link.jsx'

import { useMyContext } from '../../context/MyContext.jsx'
import { useEffect, useState } from 'react'

import { ImageIcon } from 'lucide-react'

import styles from './HeroBanner.module.css'

export default function HeroBanner ({ movie }) {
  const { VITE_API_IMAGE_URL } = import.meta.env
  // const { state: globalState } = useMyContext()
  // const movie = globalState.home.movies.list[0]
  const [windowWidth, setWindowWith] = useState(window.innerWidth)
  const [loadingBackground, setLoadingBackground] = useState(true)

  // Breakpoints
  const isMobile = windowWidth < 768
  const isTable = windowWidth >= 768 && windowWidth < 1024
  const isDesktop = windowWidth >= 1024

  // Update windowWidth when change viewport width
  useEffect(() => {
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  function handleResize () {
    setWindowWith(window.innerWidth)
  }

  function handleImageLoad () {
    setLoadingBackground(false)
  }

  function handleImageError () {
    setLoadingBackground(false)
  }

  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <h1 className={styles.title}>{movie.title}</h1>
        <p className={styles.description}>{movie.overview}</p>
        <div className={styles.buttons}>
          {
            movie.backdrop_path
              ? (
                <Link className={styles.infoBtn} to={`/movies/${movie.id}`} role='button'>Details</Link>
                )
              : (
                <button
                  className={styles.infoBtn}
                  style={{ cursor: 'not-allowed' }}
                >
                  Details
                </button>
                )
          }
        </div>
      </div>
      <div className={`${styles.heroImageContainer} ${loadingBackground ? '' : styles.spinnerOff}`}>
        {
          movie.backdrop_path
            ? (
              <img
                className={styles.heroImage}
                src={`${VITE_API_IMAGE_URL}/${isMobile ? 'w500' : 'w1280'}/${isMobile ? movie.poster_path : movie.backdrop_path}`} alt={movie.title}
                onLoad={handleImageLoad}
                onError={handleImageError}
              />
              )
            : (
              <div
                className={styles.heroImage}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: 'rgba(0,0,0,0.5)'
                }}
              >
                <ImageIcon size={100} />
                <p>Image not found</p>
              </div>
              )
        }
      </div>
      <div className={styles.fadeBottom} />
    </section>
  )
}
