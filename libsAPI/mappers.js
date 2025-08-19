export function getFilters (query) {
  const filters = {
    page: Number(query.page) || 1,
    lastMovie: Number(query.lastMovie) || 0,
    moviesPerPage: Number(query.quantity) || 20
  }

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
