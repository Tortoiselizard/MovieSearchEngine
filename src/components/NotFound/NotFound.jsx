import styles from './NotFound.module.css'

export default function NotFound () {
  return (
    <div className={styles.notFoundContainer}>
      <h1 className={styles.title}>404</h1>
      <h2 className={styles.description}>Page Not Found</h2>
    </div>
  )
}
