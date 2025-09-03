import NavBar from '../NavBar/NavBar'

import styles from './Drawer.module.css'

export default function Drawer ({ open, onClose }) {
  return (
    <>
      <div
        className={`${styles.overlayDrawer} ${open ? styles.overlayActive : ''}`}
        onClick={onClose}
      />
      <div className={`${styles.drawer} ${open ? styles.drawerOpen : ''}`}>
        <NavBar />
      </div>
    </>
  )
}
