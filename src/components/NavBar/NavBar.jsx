import { Link } from 'react-router'

import styles from './NavBar.module.css'

export default function NavBar () {
  return (
    <nav className={styles.navBarContainer}>
      <Link to='/' className={styles.navLink}>Popular</Link>
      <Link to='/favorites' className={styles.navLink}>Favorites</Link>
    </nav>
  )
}
