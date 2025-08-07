export function getAPIPages ({ page, moviesPerPage }) {
  // Get movies range

  const endMovie = page * moviesPerPage
  const startMovie = endMovie - moviesPerPage + 1

  // Get api pages
  let endPageAPI = Math.trunc(endMovie / 20)
  if (endMovie % 20 !== 0) {
    endPageAPI = endPageAPI + 1
  }
  let startPageAPI = Math.trunc(startMovie / 20)
  if (startMovie % 20 !== 0) {
    startPageAPI = startPageAPI + 1
  }

  const pages = Array.from({ length: endPageAPI - startPageAPI + 1 }, (_, i) => i + startPageAPI)

  return { startMovie, endMovie, pages }
}

export function mapMovies ({ moviesAPI, start, moviesPerPage, page }) {
  const totalMoviesAPI = moviesAPI.reduce((acc, cur) => acc.concat(cur.results), [])
  const startIndex = start % 20 - 1
  const endIndex = startIndex + moviesPerPage

  const results = totalMoviesAPI.slice(startIndex, endIndex)

  const totalResults = moviesAPI[0].total_results > 100 ? 100 : moviesAPI[0].total_results

  let totalPages = Math.trunc(totalResults / moviesPerPage)
  if (totalResults % moviesPerPage !== 0) totalPages++

  return {
    page,
    results,
    total_pages: totalPages,
    total_results: totalResults
  }
}
