import { ArrowLeft } from 'lucide-react'

import { useLocation } from 'react-router'
import useHistory from '../../hooks/useHistory'

import styles from './ComeBack.module.css'

export default function ComeBack () {
  const { pathname } = useLocation()
  const { goToPrevious, replaceLast, history } = useHistory()
  const { list } = history

  function goComeBack () {
    if (pathname === '/notFound' || list.length < 2) {
      replaceLast('/')
      return
    }
    goToPrevious()
  }

  return (
    <button className={styles.comeBackContainer} onClick={goComeBack}>
      <ArrowLeft />
    </button>
  )
}
