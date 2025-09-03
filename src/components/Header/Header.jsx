import SearchBar from '../SearchBar/SearchBar'
import ComeBack from '../ComeBack/ComeBack'
import NavBar from '../NavBar/NavBar'
import GenreSelector from '../GenreSelector/GenreSelector'
import Drawer from '../Drawer/Drawer'
import { Menu } from 'lucide-react'

import { useLocation } from 'react-router'
import { useState, useMemo, useEffect } from 'react'

import styles from './Header.module.css'

export default function Header () {
  const location = useLocation()
  const { pathname } = location
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const screen = useMemo(() => {
    const viewportWidth = window.innerWidth
    if (viewportWidth < 480) return 'smartphone'
    if (viewportWidth < 900) return 'tablet'
    else return 'computer'
  }, [])

  function toggleDrawer () {
    setIsDrawerOpen(prevState => !prevState)
  }

  return (
    <header className={styles.header}>
      <div className={styles.filterContainer}>
        {
          pathname === '/' || pathname === '/search'
            ? (
              <>
                <GenreSelector />
                <SearchBar />
              </>
              )
            : null
        }
      </div>
      {
        screen === 'smartphone'
          ? (
            <>
              <button
                className={styles.hamburger}
                aria-label='Open drawer'
                onClick={toggleDrawer}
              >
                <Menu />
              </button>
              <Drawer open={isDrawerOpen} onClose={() => { setIsDrawerOpen(false) }} />
            </>
            )
          : null
      }
      {
        pathname !== '/' && <ComeBack />
      }
      {
        screen !== 'smartphone' && <NavBar />
      }
    </header>
  )
}
