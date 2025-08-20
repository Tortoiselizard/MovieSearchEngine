export function getFilters (query) {
  const filters = {}

  for (const filter in query) {
    switch (filter) {
      case 'title': {
        filters.title = query[filter]
        break
      }
      case 'genre': {
        filters.with_genres = Number(query[filter])
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
