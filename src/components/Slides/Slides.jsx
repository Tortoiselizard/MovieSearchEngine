import PropTypes from 'prop-types'

import { cloneElement, useState } from 'react'

import styles from './Slides.module.css'

export default function Slides ({ items, children }) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoplaying] = useState(true)

  function goToSlide (index) {
    setCurrentSlide(index)
    setIsAutoplaying(false)
  }

  return (
    <div className={styles.sliderContainer}>
      <div className={styles.slider}>
        <div
          className={styles.slidesWrapper}
          style={{
            transform: `translateX(-${currentSlide * 20}%)`
          }}
        >
          {
            items.map(item =>
              <div
                key={item.id}
                className={styles.slide}
              >
                {
                  cloneElement(children, {
                    movie: item
                  })
                }
              </div>
            )
          }
        </div>

        <div className={styles.dotsContainer}>
          {items.map((_, index) => (
            <button
              key={index}
              className={`${styles.dot} ${index === currentSlide ? styles.activeDot : ''}`}
              onClick={() => { goToSlide(index) }}
              aria-label={`Move to movie ${index + 1}`}
            />
          ))}
        </div>
      </div>

    </div>
  )
}

Slides.propTypes = {
  items: PropTypes.array.isRequired,
  children: PropTypes.element.isRequired
}
