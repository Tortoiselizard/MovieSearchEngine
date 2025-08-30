import HeroDetails from '../HeroDetails/HeroDetails'
import ActorsContainer from '../ActorsContainer/ActorsContainer'
import Spinner from '../Spinner/Spinner'

import { useEffect, useState } from 'react'
import { useParams } from 'react-router'

import { requestMoviesById } from '../../services/moviesApi'
import { useMyContext } from '../../context/MyContext'
import { updateMovieDetails, loadMovieDetails } from '../../context/actions'

export default function MovieDetails () {
  const { id } = useParams()
  const { state: globalState, dispatch } = useMyContext()
  const { movieDetails } = globalState
  const [firstLoad, setFirstLoad] = useState(true)

  useEffect(() => {
    if (movieDetails.movieId !== id) {
      getMovieById()
    }
    setFirstLoad(false)
  }, [])

  async function getMovieById () {
    dispatch(loadMovieDetails())
    try {
      const newMovie = await requestMoviesById(id)
      dispatch(updateMovieDetails({
        data: newMovie,
        movieId: id
      }))
    } catch (error) {
      alert(error.message)
    }
  }

  if (firstLoad) return null

  return (
    <>
      {
        movieDetails.status === 'pending'
          ? (
            <Spinner />
            )
          : movieDetails.status === 'fail'
            ? (
              <p>Error: {movieDetails.error}</p>
              )
            : movieDetails.status === 'successful'
              ? (
                <>
                  <HeroDetails movie={movieDetails.data} />
                  <ActorsContainer />
                </>

                )
              : null
      }
    </>
  )
}
