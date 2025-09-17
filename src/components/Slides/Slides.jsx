import PropTypes from 'prop-types'

import { cloneElement, useEffect, useRef, useState } from 'react'

import styles from './Slides.module.css'

export default function Slides ({ items, children }) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoplaying] = useState(true)
  const [isDragging, setIsDragging] = useState(null)
  const initialPosition = useRef(null)
  const displacement = useRef(null)
  const slider = useRef()

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % items.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  function goToSlide (index) {
    setCurrentSlide(index)
    setIsAutoplaying(false)
    setTimeout(() => setIsAutoplaying(true), 8000)
  }

  function handleTouchMove (event) {
    if (!initialPosition.current) {
      setIsAutoplaying(false)
      const firstTouch = event.touches[0]
      const { clientX, clientY } = firstTouch
      initialPosition.current = { x: clientX, y: clientY }
    }
    if (isDragging !== null && !isDragging) return
    const touch = event.touches[0]
    const x = touch.clientX
    const y = touch.clientY
    displacement.current = {
      x: x - initialPosition.current.x,
      y: y - initialPosition.current.y
    }
    if (displacement.current.y === 0 && displacement.current.x === 0) return
    if (Math.abs(displacement.current.y) > Math.abs(displacement.current.x)) {
      setIsDragging(false)
      return
    }
    document.body.style.overflow = 'hidden'
    slider.current.style.transition = 'transform 0s ease-in-out'
    slider.current.style.transform = `translateX(calc(-${currentSlide * 20}% + ${displacement.current.x}px))`
    setIsAutoplaying(false)
    setTimeout(() => setIsAutoplaying(true), 8000)
  }

  function handleTouchEnd () {
    setIsDragging(null)
    initialPosition.current = null
    let newCurrentSlide = currentSlide
    if (!displacement.current) return
    if (displacement.current.x < -50 && currentSlide < items.length - 1) {
      newCurrentSlide = currentSlide + 1
      setCurrentSlide(newCurrentSlide)
    } else if (displacement.current.x > 50 && currentSlide > 0) {
      newCurrentSlide = currentSlide - 1
      setCurrentSlide(newCurrentSlide)
    }
    displacement.current = null
    slider.current.style.transition = ''
    slider.current.style.transform = `translateX(-${newCurrentSlide * 20}%)`
    document.body.style.overflow = ''
  }

  return (
    <div className={styles.sliderContainer}>
      <div
        className={styles.slider}
      >
        <div
          ref={slider}
          className={styles.slidesWrapper}
          style={{
            transform: `translateX(-${currentSlide * 20}%)`
          }}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
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
