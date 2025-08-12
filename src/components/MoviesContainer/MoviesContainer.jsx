import PropTypes from 'prop-types'
import MovieCard from '../MovieCard/MovieCard'

import { ChevronRight, ChevronLeft } from 'lucide-react'

import { useMyContext } from '../../context/MyContext'
import { useEffect, useMemo, useRef, useState } from 'react'

import { updateMode, updateMovies } from '../../context/actions'

import styles from './MoviesContainer.module.css'

export default function MoviesContainer () {
  const { state: globalState, dispatch } = useMyContext()
  const { movies } = globalState.home
  const [position, setPosition] = useState(0)
  const itemsContainer = useRef()
  const [scrollButtonRightVisibility, setScrollButtonRightVisibility] = useState(true)
  const [countCardVisibles, setCountCardVisibles] = useState(0)
  const imageSize = useMemo(() => {
    const viewportWidth = window.innerWidth
    if (viewportWidth < 480) return '/w185'
    else return '/w342'
  }, [])

  // Initialice scrollbar in 0
  useEffect(() => {
    itemsContainer.current.scrollTo({ left: 0 })
  }, [])

  // update countCardVisibles
  useEffect(() => {
    if (!itemsContainer.current) return
    const containerRect = itemsContainer.current.getBoundingClientRect()
    const elementRect = itemsContainer.current.childNodes[1].getBoundingClientRect()
    const n = Math.floor(containerRect.width / (elementRect.width + 8))
    setCountCardVisibles(n)
  }, [itemsContainer.current])

  function scroll (direction) {
    if (!itemsContainer.current) return
    const firstElementRect = itemsContainer.current.childNodes[0].getBoundingClientRect()

    const newPosition = direction === 'left'
      ? Math.max(0, position - countCardVisibles)
      : Math.min(itemsContainer.current.childNodes.length - countCardVisibles, position + countCardVisibles)

    const targetElement = itemsContainer.current.childNodes[newPosition]
    const elementRect = targetElement.getBoundingClientRect()

    const totalScroll = elementRect.left - firstElementRect.left
    itemsContainer.current.scrollTo({ left: totalScroll, behavior: 'smooth' })
    setPosition(newPosition)
    if (newPosition === itemsContainer.current.childNodes.length - countCardVisibles) setScrollButtonRightVisibility(false)
    else if (!scrollButtonRightVisibility) setScrollButtonRightVisibility(true)
  }

  function changeToFullDataMode () {
    dispatch(updateMode('search'))
    dispatch(updateMovies({
      newMoviesData: {
        ...movies
      },
      mode: 'search'
    }))
  }

  return (
    <div className={styles.content}>
      <div className={styles.row}>
        <div className={styles.titleContainer}>
          <h2 className={styles.title}>Trending Now</h2>
          <button className={styles.more} onClick={changeToFullDataMode}>See more</button>
        </div>
        <div id='popular' className={styles.moviesContainer}>
          <button
            className={`${styles.scrollButton} ${styles.scrollLeft}`}
            style={{ opacity: position > 0 ? 1 : 0 }}
            onClick={() => { scroll('left') }}
          >
            <ChevronLeft className={styles.scrollIcon} />
          </button>
          <div ref={itemsContainer} className={styles.itemsContainer}>
            {
              movies.list.slice(1).map(movie => (
                <MovieCard key={movie.id} movie={movie} imageSize={imageSize} />
              ))
            }
          </div>
          <button
            className={`${styles.scrollButton} ${styles.scrollRight}`}
            style={{ opacity: scrollButtonRightVisibility ? 1 : 0 }}
            onClick={() => { scroll('right') }}
          >
            <ChevronRight className={styles.scrollIcon} />
          </button>
        </div>
      </div>
    </div>
  )
}

MoviesContainer.propTypes = {
  changeMode: PropTypes.func.isRequired
}
