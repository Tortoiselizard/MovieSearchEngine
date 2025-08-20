import MovieCard from '../MovieCard/MovieCard'

import { useMyContext } from '../../context/MyContext'
import { useEffect, useMemo, useRef, useState } from 'react'
import { addMovies } from '../../context/actions.js'
import { requestMovies } from '../../services/moviesApi'

import styles from './FullData.module.css'
import Spinner from '../Spinner/Spinner.jsx'

export default function FullData () {
  const { state: globalState, dispatch } = useMyContext()
  const { search, mode } = globalState
  const movies = useRef(search.movies)
  const loadingZone = useRef()
  const [loadingNextPage, setLoadingNextPage] = useState(false)
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
    return observer
  }, [loadingNextPage])

  // Update movies
  useEffect(() => {
    movies.current = globalState.search.movies
  }, [globalState.search.movies])

  // Update movies when reach the end of the scroll
  useEffect(() => {
    if (loadingNextPage) return
    if (loadingZone.current) {
      observer.observe(loadingZone.current)
    }

    return () => {
      if (loadingZone.current) {
        observer.unobserve(loadingZone.current)
      }
    }
  }, [loadingNextPage])

  async function getMore () {
    const { category, moviesPerPage: quantity, lastMovie: indexMovie, page, lastPage: lastPagePrev } = movies.current
    if (lastPagePrev) return
    const newPage = page + (indexMovie ? 0 : 1)
    setLoadingNextPage(true)
    try {
      const { page, lastMovie, results, lastPage } = await requestMovies({
        page: newPage,
        lastMovie: indexMovie,
        quantity,
        ...movies.current.filters
      })
      const newList = [...movies.current.list, ...results]
      const newMoviesData = {
        list: newList,
        category,
        page,
        lastMovie,
        ...(lastPage ? { lastPage } : {}),
        moviesPerPage: quantity,
        filters: { ...movies.current.filters }
      }
      dispatch(addMovies({ newMoviesData, mode }))
      setLoadingNextPage(false)
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <div className={styles.fullDataContainer}>
      <div className={styles.fullDataItems}>
        {
          globalState[mode].movies.status === 'pending'
            ? (
              <Spinner />
              )
            : globalState[mode].movies.status === 'fail'
              ? (
                <p>Error: {globalState[mode].movies.error}</p>
                )
              : globalState[mode].movies.status === 'successful'
                ? (
                    globalState[mode].movies.list.length
                      ? (
                          globalState[mode].movies.list.map((movie, index) => (
                            <MovieCard key={`id:${movie.id}-index:${index}`} data={movie} imageSize={imageSize} />
                          ))
                        )
                      : (
                        <p>No se han encontrado coincidencias</p>
                        )
                  )
                : null
        }
      </div>
      <div className={styles.loadingZone} ref={loadingZone}>
        {
          loadingNextPage
            ? (
              <Spinner />
              )
            : null
        }
      </div>
    </div>
  )
}
