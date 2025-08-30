import HeroActorDetails from '../HeroActorDetails/HeroActorDetails'
import Spinner from '../Spinner/Spinner'
import FilmsActorContainer from '../FilmsActorContainer/FilmsActorContainer'

import { useEffect, useState } from 'react'
import { useParams } from 'react-router'

import { requestActor } from '../../services/moviesApi'
import { useMyContext } from '../../context/MyContext'
import { updateActorDetails, loadActorDetails, updateAlert } from '../../context/actions'

export default function ActorDetails () {
  const { id } = useParams()
  const { state: globalState, dispatch } = useMyContext()
  const { actorDetails } = globalState
  const [firstLoad, setFirstLoad] = useState(true)

  useEffect(() => {
    if (actorDetails.actorId !== id) {
      getActorById()
    }
    setFirstLoad(false)
  }, [])

  async function getActorById () {
    dispatch(loadActorDetails())
    try {
      const newActor = await requestActor(id)
      dispatch(updateActorDetails({
        data: newActor,
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
    <>
      {
        actorDetails.status === 'pending'
          ? (
            <Spinner />
            )
          : actorDetails.status === 'fail'
            ? (
              <p>Error: {actorDetails.error}</p>
              )
            : actorDetails.status === 'successful'
              ? (
                <>
                  <HeroActorDetails actor={actorDetails.data} />
                  <FilmsActorContainer />
                </>

                )
              : null
      }
    </>
  )
}
