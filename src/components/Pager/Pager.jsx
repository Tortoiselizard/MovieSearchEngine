import { useMyContext } from '../../context/MyContext'

import { updateMovies, loadMovies } from '../../context/actions.js'
import { requestPopularMovies, requestMoviesByTitle } from '../../services/moviesApi'

import styles from './Pager.module.css'
import { useEffect } from 'react'

export default function Pager () {
  const { state: globalState, dispatch } = useMyContext()
  const { movies } = globalState

  function goToPrevious () {
    getMovies({ category: movies.category, operation: '-' })
  }

  function goToNext () {
    getMovies({ category: movies.category, operation: '+' })
  }

  async function getMovies ({ category, operation }) {
    const newPage = operation === '+' ? movies.page + 1 : movies.page - 1
    if (!(newPage >= 1)) return
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
