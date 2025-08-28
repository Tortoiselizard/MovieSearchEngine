import Grid from '../Grid/Grid.jsx'
import ActorCard from '../ActorCard/ActorCard.jsx'
import Spinner from '../Spinner/Spinner.jsx'

import { useState, useEffect } from 'react'
import { useParams } from 'react-router'

import { requestActors } from '../../services/moviesApi.js'

import styles from './Cast.module.css'

export default function Cast () {
  const { id } = useParams()
  const [actors, setActors] = useState({
    status: 'idle',
    list: [],
    error: null
  })

  // Update actors
  useEffect(() => {
    if (actors.status !== 'idle') return
    getCast()
  }, [])

  async function getCast () {
    setActors({
      status: 'pending',
      list: [],
      error: null
    })
    try {
      const newActors = await requestActors(id)

      setActors({
        list: newActors,
        status: 'successful',
        error: null
      })
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <div className={styles.fullDataCast}>
      {
          actors.status === 'pending'
            ? (
              <Spinner />
              )
            : actors.status === 'fail'
              ? (
                <p>Error: {actors.error}</p>
                )
              : actors.status === 'successful'
                ? (
                    actors.list.length
                      ? (
                        <Grid items={actors.list} getMoreItems={() => {}} loadingNextPage={false}>
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
