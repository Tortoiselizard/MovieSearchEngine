import Header from '../Header/Header'
import HeroDetails from '../HeroDetails/HeroDetails'

import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { requestMoviesById } from '../../services/moviesApi'

export default function MovieDetails () {
  const { id } = useParams()
  const [movie, setMovie] = useState({
    status: 'idlen',
    data: {},
    error: null
  })

  useEffect(() => {
    if (movie.status !== 'idlen') return
    getMovieById()
  }, [])

  async function getMovieById () {
    setMovie(prevState => ({
      ...prevState,
      status: 'pending'
    }))
    try {
      const newMovie = await requestMoviesById(id)
      setMovie({
        data: newMovie,
        status: 'successful',
        error: null
      })
    } catch (error) {
      setMovie({
        data: {},
        status: 'fail',
        error: error.message
      })
    }
  }

  return (
    <>
      {
        movie.status === 'pending'
          ? (
            <p>Cargando...</p>
            )
          : movie.status === 'fail'
            ? (
              <p>Error: {movie.error}</p>
              )
            : movie.status === 'successful'
              ? (
                <>
                  <Header />
                  <HeroDetails movie={movie.data} />
                </>

                )
              : null
      }
    </>
  )
}
