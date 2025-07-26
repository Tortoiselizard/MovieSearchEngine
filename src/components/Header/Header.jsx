import SearchBar from '../SearchBar/SearchBar'
import ComeBack from '../ComeBack/ComeBack'
import NavBar from '../NavBar/NavBar'
import styles from './Header.module.css'

export default function Header () {
  return (
    <header className={styles.header}>
      <SearchBar />
      <ComeBack />
      <NavBar />
    </header>
  )
}
