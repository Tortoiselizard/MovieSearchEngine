import { useMyContext } from '../../context/MyContext'

import { updateMovies, loadMovies } from '../../context/actions.js'
import { requestPopularMovies, requestMoviesByTitle } from '../../services/moviesApi'

import styles from './Pager.module.css'

export default function Pager () {
  const { state: globalState, dispatch } = useMyContext()
  const { movies } = globalState

  function goToPrevious () {
    getMovies({ category: movies.category, operation: '-' })
  }

  function goToNext () {
    getMovies({ category: movies.category, operation: '+' })
  }

  function gotToPage (page) {
    getMovies({ category: movies.category, pag: page })
  }

  async function getMovies ({ category, operation, pag }) {
    let newPage
    if (operation) {
      newPage = operation === '+' ? movies.page + 1 : movies.page - 1
    } else if (pag) {
      newPage = pag
    }
    if (!(newPage >= 1)) return
    if (newPage === movies.page) return
    dispatch(loadMovies())
    try {
      let page, results, total_pages, total_results
      switch (category) {
        case 'popular': {
          ({ page, results, total_pages, total_results } = await requestPopularMovies({ page: newPage }))
          break
        }
        case 'search': {
          ({ page, results, total_pages, total_results } = await requestMoviesByTitle({
            query: movies.title,
            page: newPage
          })
          )
          break
        }
        default: {
          return
        }
      }
      dispatch(updateMovies({ list: results, category, title: movies.title, page, totalPages: total_pages }))
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <div className={styles.container}>
      <button
        className={styles.button}
        disabled={movies.page <= 1}
        onClick={goToPrevious}
      >
        Previous
      </button>
      {
        Array.from({ length: 5 }, (_, i) => i + 1).map((page, index) => (
          <button
            key={index + 1}
            className={styles.button}
            onClick={() => { gotToPage(index + 1) }}
          >{page}
          </button>
        ))
      }
      <button
        className={styles.button}
        onClick={goToNext}
      >Next
      </button>
    </div>
  )
}
