import styles from './Spinner.module.css'

export default function Spinner () {
  return (
    <div className={styles.spinnerContainer}>
      <div className={styles.spinner}>
        <div className={styles.outerRing} />
        <div className={styles.middleRing} />
        <div className={styles.innerRing} />
        <div className={styles.centerDot} />
      </div>
    </div>

  )
}
