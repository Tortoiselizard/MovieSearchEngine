import { useNavigate, useMatch } from 'react-router'
import { ArrowLeft } from 'lucide-react'
import { useMyContext } from '../../context/MyContext'

import { updateMode } from '../../context/actions'

import styles from './ComeBack.module.css'

export default function ComeBack () {
  const isHome = useMatch('/')
  const navigate = useNavigate()
  const { state: globalState, dispatch } = useMyContext()
  const { mode } = globalState.home
  if (isHome && mode === 'home') return null

  function moveTo () {
    if (isHome && mode === 'search') return changeToSummaryMode()
    navigate('/')
  }

  function changeToSummaryMode () {
    dispatch(updateMode('home'))
  }

  return (
    <button className={styles.container} onClick={moveTo}>
      <ArrowLeft />
    </button>
  )
}
