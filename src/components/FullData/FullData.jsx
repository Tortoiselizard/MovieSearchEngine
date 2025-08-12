import MovieCard from '../MovieCard/MovieCard'
import Pager from '../Pager/Pager'

import { useMyContext } from '../../context/MyContext'
import { useMemo } from 'react'

import styles from './FullData.module.css'

export default function FullData () {
  const { state: globalState } = useMyContext()
  const { mode } = globalState
  const imageSize = useMemo(() => {
    const viewportWidth = window.innerWidth
    if (viewportWidth < 480) return '/w185'
    else return '/w342'
  }, [])

  return (
    <>
      <div className={styles.moviesContainer}>
        <div className={styles.itemsContainer}>
          {
            globalState[mode].movies.list.map(movie => (
              <MovieCard key={movie.id} movie={movie} imageSize={imageSize} />
            ))
          }
        </div>
        <Pager />
      </div>
    </>
  )
}
