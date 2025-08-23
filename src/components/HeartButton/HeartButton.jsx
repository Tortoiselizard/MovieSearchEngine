import PropTypes from 'prop-types'
import { Heart } from 'lucide-react'

import styles from './HeartButton.module.css'
import { useState } from 'react'

export default function HeartButton ({ movieId }) {
  const [isActive, setIsActive] = useState(false)

  function handleClick () {
    const newIsActive = !isActive
    setIsActive(newIsActive)
    if (newIsActive) {
      return addMovieToFavorite(movieId)
    }
    return removeMovieFromFavorite(movieId)
  }

  function addMovieToFavorite (movieId) {
    const favorites = localStorage.getItem('favorites')
    if (!favorites) {
      const newFavorites = [movieId]
      return localStorage.setItem('favorites', JSON.stringify(newFavorites))
    }

    const newFavorites = JSON.parse(favorites)
    newFavorites.push(movieId)
    localStorage.setItem('favorites', JSON.stringify(newFavorites))
  }

  function removeMovieFromFavorite (movieId) {
    const favorites = localStorage.getItem('favorites')
    if (!favorites) {
      return
    }

    const newFavorites = JSON.parse(favorites)
    const index = newFavorites.indexOf(movieId)
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
  movieId: PropTypes.number.isRequired
}
