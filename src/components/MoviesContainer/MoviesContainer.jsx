import PropTypes from 'prop-types'
import Carousel from '../Carousel/Carousel'

import { useMyContext } from '../../context/MyContext'

import { updateMode, updateMovies } from '../../context/actions'

import styles from './MoviesContainer.module.css'

export default function MoviesContainer () {
  const { state: globalState, dispatch } = useMyContext()
  const { movies } = globalState.home

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
      <Carousel items={movies.list} title='Trending Now' seeMore={changeToFullDataMode} id='popular' />
    </div>
  )
}

MoviesContainer.propTypes = {
  changeMode: PropTypes.func.isRequired
}
