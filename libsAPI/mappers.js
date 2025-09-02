export function getFilters (query) {
  const filters = {}

  for (const filter in query) {
    switch (filter) {
      case 'text': {
        filters.text = query[filter]
        break
      }
      case 'genre': {
        filters.with_genres = Number(query[filter])
        break
      }
      case 'currentMovies': {
        try {
          const parsedData = JSON.parse(query[filter])
          if (!Array.isArray(parsedData)) continue
          filters.currentMovies = parsedData
        } catch (error) {
          continue
        }
        break
      }
      default: break
    }
  }
  return filters
}

export function getQueries (query) {
  const queries = {
    page: Number(query.page) || 1,
    lastMovie: Number(query.lastMovie) || 0,
    moviesPerPage: Number(query.quantity) || 20
  }

  return queries
}
