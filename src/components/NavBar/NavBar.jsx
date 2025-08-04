import { useMyContext } from '../../context/MyContext.jsx'
import { updateMovies, loadMovies } from '../../context/actions.js'
import { useMatch } from 'react-router'

import { requestPopularMovies } from '../../services/moviesApi'

import styles from './NavBar.module.css'

export default function NavBar () {
  const { state: globalState, dispatch } = useMyContext()
  const { movies, mode } = globalState
  const isHome = useMatch('/')
  if (!isHome || mode === 'fullData') return

  async function getMovies (category) {
    if (movies.category === category) return
    switch (category) {
      case 'popular': {
        dispatch(loadMovies())
        try {
          const { page, results, total_pages, total_results } = await requestPopularMovies()
          dispatch(updateMovies({ list: results, category: 'popular' }))
        } catch (error) {
          alert(error.message)
        }
        break
      }
    }
  }
  return (
    <nav className={styles.container}>
      <button className={styles.navLink} onClick={() => { getMovies('popular') }}>Popular</button>
    </nav>
  )
}
