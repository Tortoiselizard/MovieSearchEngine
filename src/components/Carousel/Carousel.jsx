import PropTypes from 'prop-types'

import { useState, useEffect, useRef, cloneElement } from 'react'

import { ChevronRight, ChevronLeft } from 'lucide-react'
import styles from './Carousel.module.css'

export default function Carousel ({ items, title, seeMore, id, children, imageSize }) {
  const [position, setPosition] = useState(0)
  const itemsContainer = useRef()
  const [scrollButtonRightVisibility, setScrollButtonRightVisibility] = useState(true)
  const [countCardVisibles, setCountCardVisibles] = useState(0)

  // Initialice scrollbar in 0
  useEffect(() => {
    itemsContainer.current.scrollTo({ left: 0 })
  }, [])

  // update countCardVisibles
  useEffect(() => {
    if (!itemsContainer.current || !items.length) return
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

  return (
    <div className={styles.carouselContainer}>
      <div className={styles.carouselTitle}>
        <h2 className={styles.title}>{title}</h2>
        <button className={styles.more} onClick={seeMore}>See more</button>
      </div>
      <div id={id} className={styles.rowItemsContainer}>
        <button
          className={`${styles.scrollButton} ${styles.scrollLeft}`}
          style={{ opacity: position > 0 ? 1 : 0 }}
          onClick={() => { scroll('left') }}
        >
          <ChevronLeft className={styles.scrollIcon} />
        </button>
        <div ref={itemsContainer} className={styles.itemsContainer}>
          {
            items.map(item => (
              cloneElement(children, {
                key: item.id,
                data: item,
                imageSize
              })
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
  )
}

Carousel.propTypes = {
  items: PropTypes.array.isRequired,
  children: PropTypes.element.isRequired,
  title: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  seeMore: PropTypes.func.isRequired,
  imageSize: PropTypes.string.isRequired
}
