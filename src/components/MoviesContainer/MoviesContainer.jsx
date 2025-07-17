import MovieCard from '../MovieCard/MovieCard'

import { useMyContext } from '../../context/MyContext'

export default function MoviesContainer () {
  const { state: globalState } = useMyContext()
  const { movies } = globalState

  return (
    <div>
      <h2>Popular</h2>
      <div>
        {
          movies.list.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))
        }
      </div>
    </div>
  )
}
