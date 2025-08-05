import { useMyContext } from '../../context/MyContext'

import { updateMovies, loadMovies } from '../../context/actions.js'
import { requestPopularMovies, requestMoviesByTitle } from '../../services/moviesApi'

import { ChevronLeft, ChevronRight } from 'lucide-react'

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
    <>
      <div className={styles.pagerContainer}>
        <button
          className={`${styles.buttonPager} ${styles.prevNext}`}
          disabled={movies.page <= 1}
          onClick={goToPrevious}
        >
          <ChevronLeft />
          Previous
        </button>
        {
          Array.from({ length: 10 }, (_, i) => i + 1).slice(0, 5).map((page) => (
            <button
              key={page}
              className={`${styles.buttonPager} ${page === movies.page ? styles.active : ''}`}
              onClick={() => { gotToPage(page) }}
            >{page}
            </button>
          ))
        }
        <button
          className={`${styles.buttonPager} ${styles.prevNext}`}
          onClick={goToNext}
        >
          Next
          <ChevronRight />
        </button>

      </div>
      <p className={styles.pageInfo}>showing n of m movies</p>
    </>
  )
}
