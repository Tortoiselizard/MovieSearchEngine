import { Link, useLocation } from 'react-router'

import styles from './NavBar.module.css'
import { useEffect, useState } from 'react'

export default function NavBar () {
  const { pathname } = useLocation()
  const [optionActive, setOptionActive] = useState('popular')
  const replace = pathname === '/notFound'

  useEffect(() => {
    if (optionActive === pathname) return
    const newOptionActive = pathname
    setOptionActive(newOptionActive)
  }, [pathname])

  return (
    <nav className={styles.navBarContainer}>
      <Link
        to='/'
        className={`${styles.navLink} ${optionActive === '/' ? styles.active : ''}`}
        replace={replace}
      >
        Popular
      </Link>
      <Link
        to='/favorites'
        className={`${styles.navLink} ${optionActive === '/favorites' ? styles.active : ''}`}
        replace={replace}
      >
        Favorites
      </Link>
    </nav>
  )
}
