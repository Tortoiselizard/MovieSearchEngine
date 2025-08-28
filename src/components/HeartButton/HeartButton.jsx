import PropTypes from 'prop-types'
import { Heart } from 'lucide-react'

import styles from './HeartButton.module.css'
import { useEffect, useState } from 'react'

import { summaryMovieData } from '../../libs/mappers'

export default function HeartButton ({ movie }) {
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    const favoritesString = localStorage.getItem('favorites')
    if (!favoritesString) return
    const favorites = JSON.parse(favoritesString)
    const newIsActive = favorites.some(({ id }) => id === movie.id)
    if (!newIsActive) return
    setIsActive(newIsActive)
  }, [])

  function handleClick () {
    const newIsActive = !isActive
    setIsActive(newIsActive)
    if (newIsActive) {
      return addMovieToFavorite(movie)
    }
    return removeMovieFromFavorite(movie)
  }

  function addMovieToFavorite (movie) {
    const summerMovie = summaryMovieData(movie)
    const favorites = localStorage.getItem('favorites')
    if (!favorites) {
      const newFavorites = [summerMovie]
      return localStorage.setItem('favorites', JSON.stringify(newFavorites))
    }

    const newFavorites = JSON.parse(favorites)
    newFavorites.push(summerMovie)
    localStorage.setItem('favorites', JSON.stringify(newFavorites))
  }

  function removeMovieFromFavorite (movie) {
    const favorites = localStorage.getItem('favorites')
    if (!favorites) {
      return
    }

    const newFavorites = JSON.parse(favorites)
    const index = newFavorites.findIndex(({ id }) => id === movie.id)
    if (index === -1) return
    newFavorites.splice(index, 1)
    localStorage.setItem('favorites', JSON.stringify(newFavorites))
  }

  return (
    <button
      className={`${styles.heartButton} ${isActive ? styles.active : ''}`}
      aria-label={isActive ? 'Remove from favorties' : 'Add to favorties'}
      type='button'
      onClick={handleClick}
    >
      <Heart />
    </button>
  )
}

HeartButton.propTypes = {
  movie: PropTypes.object.isRequired
}
