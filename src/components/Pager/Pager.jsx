import { useMyContext } from '../../context/MyContext'

import { updateMovies, loadMovies } from '../../context/actions.js'
import { requestPopularMovies, requestMoviesByTitle } from '../../services/moviesApi'

import { ChevronLeft, ChevronRight, Ellipsis } from 'lucide-react'

import styles from './Pager.module.css'
import { useEffect, useState } from 'react'

export default function Pager () {
  const { state: globalState, dispatch } = useMyContext()
  const { movies } = globalState
  const [nPages, setNPages] = useState(null)
  const [pages, setPages] = useState(null)

  // Adjust nPages to screen width
  useEffect(() => {
    const totalWidth = window.innerWidth
    let newNPages

    // smarthphone
    if (totalWidth <= 768) newNPages = 4
    else if (totalWidth > 768 && totalWidth <= 992) newNPages = 6
    // coputers
    else if (totalWidth > 992) newNPages = 10

    const wholePart = Math.trunc(movies.page / newNPages)
    const rest = movies.page % newNPages
    const firstPage = rest === 0 ? wholePart * newNPages - newNPages : wholePart * newNPages
    const lastPage = firstPage + newNPages

    setNPages(newNPages)
    setPages({
      firstPage,
      lastPage
    })
  }, [window.innerWidth])

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

  function scroll (direction) {
    let newPages
    switch (direction) {
      case '-': {
        newPages = {
          firstPage: pages.firstPage - nPages,
          lastPage: pages.lastPage - nPages
        }
        if (newPages.firstPage < 0) return
        break
      }
      case '+': {
        newPages = {
          firstPage: pages.firstPage + nPages,
          lastPage: pages.lastPage + nPages
        }
        if (newPages.firstPage > movies.totalPages - 1) return
        break
      }
    }

    setPages(newPages)
  }

  if (!pages) return null

  return (
    <>
      <div className={styles.pagerContainer}>
        <div className={`${styles.buttonsContainer} ${styles.buttonsContainerLeft}`}>
          <button
            className={`${styles.buttonPager} ${styles.prevNext}`}
            disabled={movies.page <= 1}
            onClick={goToPrevious}
          >
            <ChevronLeft />
            {nPages !== 4 ? 'Previous' : ''}
          </button>
          <button
            className={`${styles.ellipse}`}
            onClick={() => { scroll('-') }}
            disabled={pages.firstPage <= 0}
          >
            <Ellipsis />
          </button>
        </div>
        <div className={styles.pagesContainer}>
          {
            Array.from({ length: movies.totalPages }, (_, i) => i + 1).slice(pages.firstPage, pages.lastPage).map((page) => (
              <button
                key={page}
                className={`${styles.buttonPager} ${page === movies.page ? styles.active : ''}`}
                onClick={() => { gotToPage(page) }}
              >{page}
              </button>
            ))
          }
        </div>
        <div className={`${styles.buttonsContainer} ${styles.buttonsContainerRight}`}>
          <button
            className={`${styles.ellipse}`}
            onClick={() => { scroll('+') }}
            disabled={pages.lastPage >= movies.totalPages - 1}
          >
            <Ellipsis />
          </button>
          <button
            className={`${styles.buttonPager} ${styles.prevNext}`}
            onClick={goToNext}
          >
            {nPages !== 4 ? 'Next' : ''}
            <ChevronRight />
          </button>
        </div>
      </div>
      <p className={styles.pageInfo}>showing n of m movies</p>
    </>
  )
}
