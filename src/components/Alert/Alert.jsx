import { X } from 'lucide-react'
import { useMyContext } from '../../context/MyContext'

import { closeAlert } from '../../context/actions'

import styles from './Alert.module.css'
import { useEffect, useRef } from 'react'

export default function Alert () {
  const { state: globalState, dispatch } = useMyContext()
  const { alert } = globalState
  const alertContainer = useRef()

  // handle clicks outside the component
  useEffect(() => {
    function handleClickOutside (event) {
      if (alertContainer.current && !alertContainer.current.contains(event.target)) {
        dispatch(closeAlert())
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  function close () {
    dispatch(closeAlert())
  }

  if (!alert.open) return

  return (
    <div className={styles.alertBackground}>
      <div className={styles.alertContainer} ref={alertContainer}>
        <h1 className={styles.alertTitle}>{alert.title}</h1>
        <p className={styles.alertText}>{alert.text}</p>
        <button onClick={close} className={styles.alertButton}>
          <X />
        </button>
      </div>
    </div>
  )
}
