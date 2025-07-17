import { Link } from 'react-router'

import { useMyContext } from '../../context/MyContext.jsx'
import styles from './HeroBanner.module.css'

export default function HeroBanner () {
  const { VITE_API_IMAGE_URL } = import.meta.env
  const { state: globalState } = useMyContext()
  const movie = globalState.movies.list[0]

  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <h1 className={styles.title}>{movie.title}</h1>
        <p className={styles.description}>{movie.overview}</p>
        <div className={styles.buttons}>
          <Link to={`/${movie.id}`} role='button'>More Info</Link>
        </div>
      </div>
      <div className={styles.heroImage}>
        <img src={`${VITE_API_IMAGE_URL}/w1280/${movie.backdrop_path}`} alt={movie.title} />
      </div>
      <div className={styles.fadeBottom} />
    </section>
  )
}
