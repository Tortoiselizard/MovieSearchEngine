import SearchBar from '../SearchBar/SearchBar'
import GenreSelector from '../GenreSelector/GenreSelector'

import { Search, X, Film } from 'lucide-react'

import { useRef, useState, cloneElement, useEffect } from 'react'
import { useMyContext } from '../../context/MyContext'

import { updateFAB } from '../../context/actions'

import styles from './ButtonFAB.module.css'

const fabOptions = [
  {
    id: 'search',
    lable: 'search',
    icon: <Search />,
    component: <SearchBar />
  },
  {
    id: 'genre',
    lable: 'genre',
    icon: <Film />,
    component: <GenreSelector />
  }
]

export default function ButtonFAB () {
  const { state: globalState, dispatch } = useMyContext()
  const { fab } = globalState
  const [isDragging, setIsDragging] = useState(false)
  const fabRef = useRef()
  const [stylesOptionsContainer, setStylesOptionsContainer] = useState({
    bottom: '70px',
    right: '0',
    alignItems: 'flex-end'
  })

  function handleTouchEnd () {
    if (isDragging) {
      setIsDragging(false)
      realignOptionsContainer()
    } else {
      dispatch(updateFAB(!fab.open))
    }
  }

  function handleMovement (e) {
    if (fab.open) return
    setIsDragging(true)
    const touch = e.touches[0]
    const x = touch.clientX
    const y = touch.clientY

    fabRef.current.style.left = (x - 28) + 'px'
    fabRef.current.style.top = (y - 25) + 'px'
  }

  function handleOptionActived (index) {
    setOptionsActived(prevState => {
      const newPrevState = [...prevState]
      newPrevState[index] = true
      return newPrevState
    })
  }

  function realignOptionsContainer () {
    const { y, x } = fabRef.current.getBoundingClientRect()
    const coordinateY = y - (14 + 82)
    const coordinateX = x + 56 - 162
    const enoughYSpace = coordinateY > 0
    const enoughXSpace = coordinateX > 0
    let newStylesOptionsContainer
    if (enoughYSpace && enoughXSpace) {
      newStylesOptionsContainer = {
        bottom: '70px',
        right: '0',
        alignItems: 'flex-end'
      }
    } else if (!enoughYSpace && enoughXSpace) {
      newStylesOptionsContainer = {
        top: '70px',
        right: '0',
        alignItems: 'flex-end'
      }
    } else if (enoughYSpace && !enoughXSpace) {
      newStylesOptionsContainer = {
        bottom: '70px',
        left: '0',
        alignItems: 'flex-start'
      }
    } else if (!enoughYSpace && !enoughXSpace) {
      newStylesOptionsContainer = {
        top: '70px',
        left: '0',
        alignItems: 'flex-start'
      }
    }
    setStylesOptionsContainer(newStylesOptionsContainer)
  }

  return (
    <>
      {fab.open && (
        <div
          className={styles.overlayButtonFAB}
          onClick={() => { dispatch(updateFAB(false)) }}
        />
      )}

      <div
        className={styles.fabContainer}
        ref={fabRef}
      >
        {
          fab.open && (
            <div
              className={styles.optionsContainer}
              style={stylesOptionsContainer}
            >
              {
                 fabOptions.map((option, index) => (
                   cloneElement(option.component, {
                     key: option.id,
                     mode: 'button'
                   })
                 ))
              }
            </div>
          )
        }

        <button
          className={`${styles.fabButton} ${fab.open ? styles.active : ''}`}
          onTouchEnd={handleTouchEnd}
          onTouchMove={handleMovement}
          aria-label='Floating Action Button'
        >
          {
            fab.open
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
