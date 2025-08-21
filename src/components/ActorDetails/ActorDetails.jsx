import HeroActorDetails from '../HeroActorDetails/HeroActorDetails'
import Spinner from '../Spinner/Spinner'
import FilmsActorContainer from '../FilmsActorContainer/FilmsActorContainer'

import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { requestActor } from '../../services/moviesApi'

export default function ActorDetails () {
  const { id } = useParams()
  const [actor, setActor] = useState({
    status: 'idlen',
    data: {},
    error: null
  })

  useEffect(() => {
    if (actor.status !== 'idlen') return
    getActorById()
  }, [])

  async function getActorById () {
    setActor(prevState => ({
      ...prevState,
      status: 'pending'
    }))
    try {
      const newActor = await requestActor(id)
      setActor({
        data: newActor,
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
                  <FilmsActorContainer />
                </>

                )
              : null
      }
    </>
  )
}
