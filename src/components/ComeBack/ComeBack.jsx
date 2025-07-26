import { Link, useMatch } from 'react-router'
import { ArrowLeft } from 'lucide-react'

import styles from './ComeBack.module.css'

export default function ComeBack () {
  const isHome = useMatch('/')
  if (isHome) return null
  return (
    <Link className={styles.container} to='/'>
      <ArrowLeft />
    </Link>
  )
}
