import SearchBar from '../SearchBar/SearchBar'
import ComeBack from '../ComeBack/ComeBack'
import NavBar from '../NavBar/NavBar'
import GenreSelector from '../GenreSelector/GenreSelector'
import Drawer from '../Drawer/Drawer'
import ButtonFAB from '../ButtonFAB/ButtonFAB'

import { Menu } from 'lucide-react'

import { useLocation } from 'react-router'
import { useState, useMemo } from 'react'

import styles from './Header.module.css'

export default function Header () {
  const location = useLocation()
  const { pathname } = location
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const screen = useMemo(() => {
    const viewportWidth = window.innerWidth
    if (viewportWidth < 480) return 'mobile'
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
          screen !== 'mobile' && (pathname === '/' || pathname === '/search')
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
        pathname !== '/' && <ComeBack />
      }
      {
        screen !== 'mobile' && <NavBar />
      }
      {
        screen === 'mobile'
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
      <ButtonFAB />
    </header>
  )
}
