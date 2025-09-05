import HeroActorDetails from '../HeroActorDetails/HeroActorDetails'
import Spinner from '../Spinner/Spinner'
import FilmsActorContainer from '../FilmsActorContainer/FilmsActorContainer'
import Error from '../Error/Error'

import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import toast from 'react-hot-toast'

import { requestActor } from '../../services/moviesApi'
import { useMyContext } from '../../context/MyContext'
import { updateActorDetails, loadActorDetails, updateAlert, updateErrorActorDetails } from '../../context/actions'

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
      dispatch(updateErrorActorDetails(error.message))
      toast.error('Error getting actor detail')
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
              <Error message={actorDetails.error} />
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
