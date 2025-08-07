export function getAPIPages ({ page, moviesPerPage }) {
  // Get movies range

  const endPage = page * moviesPerPage
  const startPage = endPage - moviesPerPage + 1

  // Get api pages
  let endPageAPI = Math.trunc(endPage / 20)
  if (endPage % 20 !== 0) {
    endPageAPI = endPageAPI + 1
  }
  let startPageAPI = Math.trunc(startPage / 20)
  if (startPage % 20 !== 0) {
    startPageAPI = startPageAPI + 1
  }

  const pages = Array.from({ length: endPageAPI - startPageAPI + 1 }, (_, i) => i + startPageAPI)

  return { startPage, endPage, pages }
}

export function mapMovies ({ moviesAPI, start, moviesPerPage, page }) {
  const totalMoviesAPI = moviesAPI.reduce((acc, cur) => acc.concat(cur.results), [])
  const startIndex = start % 20 - 1
  const endIndex = startIndex + moviesPerPage + 1

  const results = totalMoviesAPI.slice(startIndex, endIndex)

  const totalResults = moviesAPI[0].total_results

  let totalPages = Math.trunc(totalResults / moviesPerPage)
  if (totalResults % moviesPerPage !== 0) totalPages++

  return {
    page: Number(page),
    results,
    total_pages: Number(totalPages),
    total_results: Number(totalResults)
  }
}
