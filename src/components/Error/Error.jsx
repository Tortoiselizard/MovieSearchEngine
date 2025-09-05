import styles from './Error.module.css'

export default function Error ({ message }) {
  return (
    <div className={styles.containerError}>
      <h1 className={styles.errorTitle}>Error</h1>
      <p className={styles.errorText}>{message}</p>
    </div>
  )
}
