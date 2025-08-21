import PropTypes from 'prop-types'

import { useEffect, useMemo, useRef, useState, cloneElement } from 'react'

import Spinner from '../Spinner/Spinner.jsx'

import styles from './Grid.module.css'

export default function Grid ({ items, children, getMoreItems, loadingNextPage }) {
  const loadingZone = useRef()
  const imageSize = useMemo(() => {
    const viewportWidth = window.innerWidth
    if (viewportWidth < 480) return '/w185'
    else return '/w342'
  }, [])
  const observer = useMemo(() => {
    if (loadingNextPage) return
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          getMoreItems()
          observer.disconnect()
        }
      })
    })
    return observer
  }, [loadingNextPage])

  // Update items when reach the end of the scroll
  useEffect(() => {
    if (loadingNextPage) return
    if (loadingZone.current) {
      observer.observe(loadingZone.current)
    }

    return () => {
      if (loadingZone.current) {
        observer.unobserve(loadingZone.current)
      }
    }
  }, [loadingNextPage])

  return (
    <div className={styles.gridContainer}>
      <div className={styles.gridItems}>
        {
          items.length
            ? (
                items.map((item, index) => (
                  cloneElement(children, {
                    key: `id:${item.id}-index:${index}`,
                    data: item,
                    imageSize
                  })
                ))
              )
            : (
              <p>No se han encontrado coincidencias</p>
              )
        }
      </div>
      <div className={styles.loadingZone} ref={loadingZone}>
        {
          loadingNextPage
            ? (
              <Spinner />
              )
            : null
        }
      </div>
    </div>
  )
}

Grid.propTypes = {
  items: PropTypes.array.isRequired,
  children: PropTypes.element.isRequired
}
