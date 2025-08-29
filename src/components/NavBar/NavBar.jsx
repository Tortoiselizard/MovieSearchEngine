import { Link, useLocation } from 'react-router'

import styles from './NavBar.module.css'

export default function NavBar () {
  const { pathname } = useLocation()
  const replace = pathname === '/notFound'
  return (
    <nav className={styles.navBarContainer}>
      <Link to='/' className={styles.navLink} replace={replace}>Popular</Link>
      <Link to='/favorites' className={styles.navLink} replace={replace}>Favorites</Link>
    </nav>
  )
}
