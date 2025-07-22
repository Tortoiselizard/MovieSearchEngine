import MovieCard from '../MovieCard/MovieCard'

import { useMyContext } from '../../context/MyContext'

import styles from './MoviesContainer.module.css'

export default function MoviesContainer () {
  const { state: globalState } = useMyContext()
  const { movies } = globalState

  return (
    <div className={styles.content}>
      <div className={styles.row}>
        <h2 className={styles.title}>Trending Now</h2>
        <div className={styles.moviesContainer}>
          {
          movies.list.slice(1).map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))
        }
        </div>
      </div>
    </div>
  )
}
