import Grid from '../Grid/Grid.jsx'
import MovieCard from '../MovieCard/MovieCard.jsx'
import Spinner from '../Spinner/Spinner.jsx'

import { useState, useEffect } from 'react'
import { useParams } from 'react-router'

import { requestFilmsActor } from '../../services/moviesApi.js'

import styles from './ActorFilms.module.css'

export default function ActorFilms () {
  const { id } = useParams()
  const [actorFilms, setActorFilms] = useState({
    status: 'idle',
    list: [],
    error: null
  })

  // Update actorFilms
  useEffect(() => {
    if (actorFilms.status !== 'idle') return
    getActorFilms()
  }, [])

  async function getActorFilms () {
    setActorFilms({
      status: 'pending',
      list: [],
      error: null
    })
    try {
      const newActorFilms = await requestFilmsActor(id)

      setActorFilms({
        list: newActorFilms,
        status: 'successful',
        error: null
      })
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <div className={styles.actorFilmsContainer}>
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
                        <Grid items={actorFilms.list} getMoreItems={() => {}} loadingNextPage={false}>
                          <MovieCard mode='search' />
                        </Grid>
                        )
                      : (
                        <p>No se han encontrado coincidencias</p>
                        )
                  )
                : null
        }
    </div>
  )
}
