import MovieCard from '../MovieCard/MovieCard'
import Carousel from '../Carousel/Carousel'
import Spinner from '../Spinner/Spinner'

import { useState, useMemo, useEffect } from 'react'
import { useParams } from 'react-router'
import { useMyContext } from '../../context/MyContext'

import { requestFilmsActor } from '../../services/moviesApi'
import { updateActorFilms, loadActorFilms, updateAlert } from '../../context/actions'

import styles from './FilmsActorContainer.module.css'

export default function FilmsActorContainer () {
  const { id } = useParams()
  const { state: globalState, dispatch } = useMyContext()
  const { actorFilms } = globalState
  const [firstLoad, setFirstLoad] = useState(true)
  const imageSize = useMemo(() => {
    const viewportWidth = window.innerWidth
    if (viewportWidth < 480) return '/w185'
    else return '/h632'
  }, [])

  useEffect(() => {
    if (actorFilms.actorId !== id) {
      getMovies()
    }
    setFirstLoad(false)
  }, [])

  async function getMovies () {
    dispatch(loadActorFilms())
    try {
      const newMovies = await requestFilmsActor(id)
      dispatch(updateActorFilms({
        list: newMovies,
        actorId: id
      }))
    } catch (error) {
      dispatch(updateAlert({
        open: true,
        title: 'Error',
        text: 'Something is wrong'
      }))
    }
  }

  if (firstLoad) return null

  return (
    <div className={styles.moviesContainer}>
      {
        actorFilms.status === 'pending'
          ? (
            <Spinner />
            )
          : actorFilms.status === 'fail'
            ? (
              <p>Error: {actorFilms.error}</p>
              )
            : actorFilms.status === 'successful'
              ? (
                  actorFilms.list.length
                    ? (
                      <Carousel items={actorFilms.list} title='Filmography' seeMore={`/actor-films/${id}`} id='cast' imageSize={imageSize}>
                        <MovieCard mode='home' />
                      </Carousel>
                      )
                    : null
                )
              : null
      }
    </div>
  )
}
