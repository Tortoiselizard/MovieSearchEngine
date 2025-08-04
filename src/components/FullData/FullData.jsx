import MovieCard from '../MovieCard/MovieCard'

import { useMyContext } from '../../context/MyContext'

import styles from './FullData.module.css'

export default function FullData () {
  const { state: globalState } = useMyContext()
  const { movies } = globalState
  return (
    <div className={styles.container}>
      <div className={styles.itemsContainer}>
        {
          movies.list.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))
        }
      </div>
    </div>
  )
}
