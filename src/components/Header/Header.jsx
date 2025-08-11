import SearchBar from '../SearchBar/SearchBar'
import ComeBack from '../ComeBack/ComeBack'
import NavBar from '../NavBar/NavBar'
import GenreSelector from '../GenreSelector/GenreSelector'

import styles from './Header.module.css'

export default function Header () {
  return (
    <header className={styles.header}>
      <div className={styles.filterContainer}>
        <GenreSelector />
        <SearchBar />
      </div>
      <ComeBack />
      <NavBar />
    </header>
  )
}
