import SearchBar from '../SearchBar/SearchBar'
import styles from './Header.module.css'

export default function Header () {
  return (
    <header className={styles.header}>
      <SearchBar />
    </header>
  )
}
