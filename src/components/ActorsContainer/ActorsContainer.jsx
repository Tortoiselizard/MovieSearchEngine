import ActorCard from '../ActorCard/ActorCard'
import Carousel from '../Carousel/Carousel'
import Spinner from '../Spinner/Spinner'

import { useParams } from 'react-router'
import { useState, useEffect, useMemo } from 'react'

import { requestActors } from '../../services/moviesApi'

import styles from './ActorsContainer.module.css'

export default function ActorsContainer () {
  const { id } = useParams()
  const [actors, setActors] = useState({
    status: 'idle',
    list: [],
    error: null
  })
  const imageSize = useMemo(() => {
    const viewportWidth = window.innerWidth
    if (viewportWidth < 480) return '/w185'
    else return '/h632'
  }, [])

  useEffect(() => {
    if (actors.status !== 'idle') return
    getActors()
  }, [])

  async function getActors () {
    setActors(prevState => ({
      ...prevState,
      status: 'pending'
    }))
    try {
      const newActors = await requestActors(id)
      setActors({
        list: newActors,
        status: 'successful',
        error: null
      })
    } catch (error) {
      setActors({
        list: [],
        status: 'fail',
        error: error.message
      })
    }
  }

  return (
    <div className={styles.actorsContainer}>
      {
        actors.status === 'pending'
          ? (
            <div className={styles.loadingContainer}>
              <Spinner />
            </div>
            )
          : actors.status === 'fail'
            ? (
              <p>Error: {actors.error}</p>
              )
            : actors.status === 'successful'
              ? (
                  actors.list.length
                    ? (
                      <Carousel
                        items={actors.list}
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
