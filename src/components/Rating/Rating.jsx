import PropTypes from 'prop-types'

import { Star } from 'lucide-react'

import styles from './Rating.module.css'
import { useEffect } from 'react'

export default function Rating ({ rating }) {
  const roundedRating = Math.round(rating * 10) / 20

  useEffect(() => {
    console.log('roundedRating:', roundedRating)
  }, [])

  return (
    <div className={styles.rating}>
      <div className={styles.starsContainer}>
        {
          Array.from({ length: 5 }, (_, index) => {
            const starIndex = index + 1
            const isFilled = starIndex <= roundedRating
            const isPartial = starIndex === Math.ceil(roundedRating)

            return (
              <div
                key={index}
                className={styles.starWrapper}
              >
                <Star
                  className={`${styles.star} ${isFilled ? styles.filled : styles.empty}`}
                  fill={isFilled ? 'currentColor' : 'none'}
                />
                {
                  isPartial && (
                    <div
                      className={styles.partialOverlay}
                      style={{
                        width: `${(roundedRating - index) * 100}%`
                      }}
                    >
                      <Star
                        className={`${styles.star} ${styles.filled}`}
                        fill='currentColor'
                      />
                    </div>
                  )
                }
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

Rating.propTypes = {
  rating: PropTypes.number.isRequired
}
