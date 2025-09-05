import Grid from '../Grid/Grid.jsx'
import MovieCard from '../MovieCard/MovieCard.jsx'
import Spinner from '../Spinner/Spinner.jsx'
import Error from '../Error/Error.jsx'

import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { useMyContext } from '../../context/MyContext.jsx'

import { requestFilmsActor } from '../../services/moviesApi.js'
import { updateActorFilms, loadActorFilms, updateAlert, updateErrorActorFilms } from '../../context/actions.js'

import styles from './ActorFilms.module.css'

export default function ActorFilms () {
  const { id } = useParams()
  const { state: globalState, dispatch } = useMyContext()
  const { actorFilms } = globalState
  const [firstLoad, setFirstLoad] = useState(true)

  // Get actorFilms
  useEffect(() => {
    if (actorFilms.actorId !== id) {
      getActorFilms()
    }
    setFirstLoad(false)
  }, [])

  async function getActorFilms () {
    dispatch(loadActorFilms())
    try {
      const newActorFilms = await requestFilmsActor(id)
      dispatch(updateActorFilms({
        list: newActorFilms,
        actorId: id
      }))
    } catch (error) {
      dispatch(updateErrorActorFilms(error.message))
      toast.error('Error getting popular movies')
    }
  }

  if (firstLoad) return null

  return (
    <div className={styles.actorFilmsContainer}>
      {
          actorFilms.status === 'pending'
            ? (
              <Spinner />
              )
            : actorFilms.status === 'fail'
              ? (
                <Error message={actorFilms.error} />
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
                        <p>No Matches Found</p>
                        )
                  )
                : null
        }
    </div>
  )
}
