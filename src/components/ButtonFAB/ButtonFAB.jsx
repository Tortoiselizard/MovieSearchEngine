import { Search, X, Film } from 'lucide-react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import styles from './ButtonFAB.module.css'

export default function ButtonFAB () {
  const [isExpaded, setIsExpanded] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const fabRef = useRef()

  function handleTouchEnd () {
    if (isDragging) {
      setIsDragging(false)
    } else {
      setIsExpanded(!isExpaded)
    }
  }

  function handleMovement (e) {
    if (isExpaded) return
    setIsDragging(true)
    const touch = e.touches[0]
    const x = touch.clientX
    const y = touch.clientY

    fabRef.current.style.left = (x - 28) + 'px'
    fabRef.current.style.top = (y - 25) + 'px'
  }

  return (
    <>
      {isExpaded && (
        <div
          className={styles.overlayButtonFAB}
          onClick={() => { setIsExpanded(false) }}
        />
      )}

      <div
        className={styles.fabContainer}
        ref={fabRef}
      >
        <button
          className={`${styles.fabButton} ${isExpaded ? styles.active : ''}`}
          onTouchEnd={handleTouchEnd}
          onTouchMove={handleMovement}
          aria-label='Floating Action Button'
        >
          {
            isExpaded
              ? (
                <X />
                )
              : (
                <Search />
                )
          }
        </button>
      </div>
    </>
  )
}
