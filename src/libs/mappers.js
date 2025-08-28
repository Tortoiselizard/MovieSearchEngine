export function getQueriesString (queries) {
  let queriesString = ''
  if (!queries) return queriesString
  const queriesStringArray = []
  for (const query in queries) {
    let newQuery
    if (Array.isArray(queries[query])) {
      newQuery = `${query}=${JSON.stringify(queries[query])}`
    } else {
      newQuery = `${query}=${queries[query]}`
    }
    queriesStringArray.push(newQuery)
  }

  if (queriesStringArray.length) {
    queriesString = '?' + queriesStringArray.join('&')
  }

  return queriesString
}

export function summaryMovieData ({
  poster_path,
  id,
  release_date,
  title
}) {
  return {
    poster_path,
    id,
    release_date,
    title
  }
}
