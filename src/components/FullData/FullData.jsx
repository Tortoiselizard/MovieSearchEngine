import MovieCard from '../MovieCard/MovieCard'

import { useMyContext } from '../../context/MyContext'
import { useEffect, useMemo, useRef, useState } from 'react'
import { addMovies, loadMovies } from '../../context/actions.js'
import { requestMovies } from '../../services/moviesApi'

import styles from './FullData.module.css'
import Spinner from '../Spinner/Spinner.jsx'

export default function FullData () {
  const { state: globalState, dispatch } = useMyContext()
  const { search, mode } = globalState
  const { movies } = search
  const loadingZone = useRef()
  const [loadingNextPage, setLoadingNextPage] = useState(false)
  const [loadingZoneAssigned, setLoadingZoneAssigned] = useState(true)
  const imageSize = useMemo(() => {
    const viewportWidth = window.innerWidth
    if (viewportWidth < 480) return '/w185'
    else return '/w342'
  }, [])
  const observer = useMemo(() => {
    if (loadingNextPage) return
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          getMore()
          observer.disconnect()
        }
      })
    })
    setLoadingZoneAssigned(true)
    return observer
  }, [loadingNextPage])

  // Update movies when reach the end of the scroll
  useEffect(() => {
    if (!loadingZoneAssigned) return
    if (loadingZone.current) {
      observer.observe(loadingZone.current)
    }

    return () => {
      if (loadingZone.current) {
        observer.unobserve(loadingZone.current)
      }
    }
  }, [loadingZoneAssigned])

  async function getMore () {
    const category = movies.category
    const quantity = movies.moviesPerPage
    const newPage = movies.page + 1
    if (!(newPage >= 1)) return
    if (newPage === movies.page) return
    setLoadingNextPage(true)
    setLoadingZoneAssigned(false)
    dispatch(loadMovies({ mode, option: 'keep' }))
    try {
      const { page, results, total_pages, total_results } = await requestMovies({
        page: newPage,
        quantity,
        ...movies.filters
      })
      const newList = [...movies.list, ...results]
      const newMoviesData = {
        list: newList,
        category,
        page,
        totalPages: total_pages,
        total_results,
        moviesPerPage: quantity,
        filters: { ...movies.filters }
      }
      dispatch(addMovies({ newMoviesData, mode }))
      setLoadingNextPage(false)
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <>
      <div className={styles.moviesContainer}>
        <div className={styles.itemsContainer}>
          {
            globalState[mode].movies.list.map((movie, index) => (
              <MovieCard key={`id:${movie.id}-index:${index}`} movie={movie} imageSize={imageSize} />
            ))
          }
        </div>
        <div className={styles.loadingZone} ref={loadingZone}>
          {
            movies.status === 'pending'
              ? (
                <Spinner />
                )
              : null
          }
        </div>
      </div>
    </>
  )
}
