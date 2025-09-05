import PropTypes from 'prop-types'
import MovieCard from '../MovieCard/MovieCard'
import Carousel from '../Carousel/Carousel'

import { useMyContext } from '../../context/MyContext'
import { useMemo } from 'react'

import styles from './MoviesContainer.module.css'

export default function MoviesContainer () {
  const { state: globalState } = useMyContext()
  const { movies } = globalState.home
  const imageSize = useMemo(() => {
    const viewportWidth = window.innerWidth
    if (viewportWidth < 480) return '/w185'
    else return '/w342'
  }, [])

  return (
    <div className={styles.content}>
      <Carousel
        items={movies.list.slice(1)}
        title='Trending Now'
        seeMore='/search'
        id='popular'
        imageSize={imageSize}
        watchSeeMore
      >
        <MovieCard mode='home' />
      </Carousel>
    </div>
  )
}

MoviesContainer.propTypes = {
  changeMode: PropTypes.func.isRequired
}
