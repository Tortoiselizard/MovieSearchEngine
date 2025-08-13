export function getFilters (query) {
  const filters = {}
  for (const property in query) {
    switch (property) {
      case 'title': {
        filters[property] = query[property]
        break
      }
      case 'genre': {
        filters.with_genres = query[property]
        break
      }
      case 'page': {
        filters[property] = Number(query[property])
        break
      }
      case 'quantity': {
        filters.moviesPerPage = Number(query[property])
        break
      }
    }
  }
  return filters
}
