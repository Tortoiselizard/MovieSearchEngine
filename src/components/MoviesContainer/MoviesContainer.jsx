import PropTypes from 'prop-types'
import MovieCard from '../MovieCard/MovieCard'
import Carousel from '../Carousel/Carousel'

import { useMyContext } from '../../context/MyContext'
import { useMemo } from 'react'

import { updateMode, updateMovies } from '../../context/actions'

import styles from './MoviesContainer.module.css'

export default function MoviesContainer () {
  const { state: globalState, dispatch } = useMyContext()
  const { movies } = globalState.home
  const imageSize = useMemo(() => {
    const viewportWidth = window.innerWidth
    if (viewportWidth < 480) return '/w185'
    else return '/w342'
  }, [])

  function changeToFullDataMode () {
    dispatch(updateMovies({
      newMoviesData: {
        ...movies
      },
      mode: 'search'
    }))
    dispatch(updateMode('search'))
  }

  return (
    <div className={styles.content}>
      <Carousel items={movies.list.slice(1)} title='Trending Now' seeMore={changeToFullDataMode} id='popular' imageSize={imageSize}>
        <MovieCard />
      </Carousel>
    </div>
  )
}

MoviesContainer.propTypes = {
  changeMode: PropTypes.func.isRequired
}
