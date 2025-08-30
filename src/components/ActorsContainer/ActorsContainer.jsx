import ActorCard from '../ActorCard/ActorCard'
import Carousel from '../Carousel/Carousel'
import Spinner from '../Spinner/Spinner'

import { useParams } from 'react-router'
import { useState, useEffect, useMemo } from 'react'
import { useMyContext } from '../../context/MyContext'

import { requestActors } from '../../services/moviesApi'
import { updateCast, loadCast } from '../../context/actions'

import styles from './ActorsContainer.module.css'

export default function ActorsContainer () {
  const { id } = useParams()
  const { state: globalState, dispatch } = useMyContext()
  const { cast } = globalState
  const [firstLoad, setFirstLoad] = useState(true)
  const imageSize = useMemo(() => {
    const viewportWidth = window.innerWidth
    if (viewportWidth < 480) return '/w185'
    else return '/h632'
  }, [])

  useEffect(() => {
    if (cast.movieId !== id) {
      getActors()
    }
    setFirstLoad(false)
  }, [])

  async function getActors () {
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

  if (firstLoad) return null

  return (
    <div className={styles.actorsContainer}>
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
                      <Carousel
                        items={cast.list}
                        title='Cast'
                        seeMore={`/cast/${id}`}
                        id='cast'
                        imageSize={imageSize}
                      >
                        <ActorCard />
                      </Carousel>
                      )
                    : null
                )
              : null
      }
    </div>
  )
}
