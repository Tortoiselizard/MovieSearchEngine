import { ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router'

import styles from './ComeBack.module.css'

export default function ComeBack () {
  const navigate = useNavigate()

  function goBack () {
    navigate(-1)
  }

  return (
    <button className={styles.comeBackContainer} onClick={goBack}>
      <ArrowLeft />
    </button>
  )
}
