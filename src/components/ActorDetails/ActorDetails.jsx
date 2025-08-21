import HeroActorDetails from '../HeroActorDetails/HeroActorDetails'
import Spinner from '../Spinner/Spinner'

import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { requestMoviesById } from '../../services/moviesApi'

export default function ActorDetails () {
  const { id } = useParams()
  const [actor, setActor] = useState({
    status: 'idlen',
    data: {},
    error: null
  })

  useEffect(() => {
    if (actor.status !== 'idlen') return
    // getMovieById()
  }, [])

  async function getMovieById () {
    setActor(prevState => ({
      ...prevState,
      status: 'pending'
    }))
    try {
      const newMovie = await requestMoviesById(id)
      setActor({
        data: newMovie,
        status: 'successful',
        error: null
      })
    } catch (error) {
      setActor({
        data: {},
        status: 'fail',
        error: error.message
      })
    }
  }

  return (
    <>
      {
        actor.status === 'pending'
          ? (
            <Spinner />
            )
          : actor.status === 'fail'
            ? (
              <p>Error: {actor.error}</p>
              )
            : actor.status === 'successful'
              ? (
                <>
                  <HeroActorDetails actor={actor.data} />
                </>

                )
              : null
      }
    </>
  )
}
