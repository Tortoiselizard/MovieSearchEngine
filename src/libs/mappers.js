export function getQueriesString (queries) {
  let queriesString = ''
  if (!queries) return queriesString
  const queriesStringArray = []
  for (const query in queries) {
    const newQuery = `${query}=${queries[query]}`
    queriesStringArray.push(newQuery)
  }

  if (queriesStringArray.length) {
    queriesString = '?' + queriesStringArray.join('&')
  }

  return queriesString
}
