import { useMyContext } from '../../context/MyContext.jsx'
import { updateMovies, loadMovies } from '../../context/actions.js'
import { useMatch } from 'react-router'

import { requestPopularMovies } from '../../services/moviesApi'

import styles from './NavBar.module.css'

export default function NavBar () {
  const { state: globalState, dispatch } = useMyContext()
  const { home, mode } = globalState
  const isHome = useMatch('/')
  if (!isHome || mode === 'search') return

  async function getMovies (category) {
    if (home.movies.category === category) return
    switch (category) {
      case 'popular': {
        dispatch(loadMovies({ mode }))
        try {
          const { page, results, total_pages, total_results } = await requestPopularMovies({ page: 1 })
          dispatch(updateMovies({
            newMoviesData: {
              list: results,
              category: 'popular',
              page,
              totalPages: total_pages,
              total_results,
              moviesPerPage: quantity
            },
            mode
          }))
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
