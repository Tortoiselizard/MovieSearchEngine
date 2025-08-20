import SearchBar from '../SearchBar/SearchBar'
import ComeBack from '../ComeBack/ComeBack'
// import NavBar from '../NavBar/NavBar'
import GenreSelector from '../GenreSelector/GenreSelector'

import { useLocation } from 'react-router'

import styles from './Header.module.css'

export default function Header () {
  const { pathname } = useLocation()

  return (
    <header className={styles.header}>
      <div className={styles.filterContainer}>
        {
          pathname === '/'
            ? (
              <>
                <GenreSelector />
                <SearchBar />
              </>
              )
            : null
        }
      </div>
      <ComeBack />
      {/* <NavBar /> */}
    </header>
  )
}
