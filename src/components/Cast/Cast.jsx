import Grid from '../Grid/Grid.jsx'
import ActorCard from '../ActorCard/ActorCard.jsx'
import Spinner from '../Spinner/Spinner.jsx'

import { useEffect } from 'react'
import { useParams } from 'react-router'
import { useMyContext } from '../../context/MyContext.jsx'

import { requestActors } from '../../services/moviesApi.js'
import { updateCast, loadCast } from '../../context/actions.js'

import styles from './Cast.module.css'

export default function Cast () {
  const { id } = useParams()
  const { state: globalState, dispatch } = useMyContext()
  const { cast } = globalState

  // Get cast
  useEffect(() => {
    if (cast.movieId === id) return
    getCast()
  }, [])

  async function getCast () {
    dispatch(loadCast())
    try {
      const newActors = await requestActors(id)

      dispatch(updateCast({
        list: newActors,
        movieId: id
      }))
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <div className={styles.fullDataCast}>
      {
          cast.status === 'pending'
            ? (
              <Spinner />
              )
            : cast.status === 'fail'
              ? (
                <p>Error: {cast.error}</p>
                )
              : cast.status === 'successful'
                ? (
                    cast.list.length
                      ? (
                        <Grid items={cast.list} getMoreItems={() => {}} loadingNextPage={false}>
                          <ActorCard />
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
