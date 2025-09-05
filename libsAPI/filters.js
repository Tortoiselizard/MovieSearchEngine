export function filterBy ({ movies, filters }) {
  const moviesFiltered = movies.filter(movie => {
    if ('with_genres' in filters) {
      const genreIds = movie.genre_ids
      if (!genreIds) return false
      if (!genreIds.includes(filters.with_genres)) return false
    }
    if ('currentMovies' in filters) {
      if (filters.currentMovies.includes(movie.id)) return false
    }
    return true
  })
  return moviesFiltered
}
