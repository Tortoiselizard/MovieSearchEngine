import { Link } from 'react-router'

import { useMyContext } from '../../context/MyContext.jsx'
import styles from './HeroBanner.module.css'
import { useEffect, useState } from 'react'

export default function HeroBanner () {
  const { VITE_API_IMAGE_URL } = import.meta.env
  const { state: globalState } = useMyContext()
  const movie = globalState.movies.list[0]
  const [windowWidth, setWindowWith] = useState(window.innerWidth)

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

  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <h1 className={styles.title}>{movie.title}</h1>
        <p className={styles.description}>{movie.overview}</p>
        <div className={styles.buttons}>
          <Link className={styles.infoBtn} to={`/${movie.id}`} role='button'>Details</Link>
        </div>
      </div>
      <div className={styles.heroImage}>
        <img src={`${VITE_API_IMAGE_URL}/w1280/${isMobile ? movie.poster_path : movie.backdrop_path}`} alt={movie.title} />
      </div>
      <div className={styles.fadeBottom} />
    </section>
  )
}
