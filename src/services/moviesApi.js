export async function getPopularMovies () {
  const response = await fetch('/api/movies')
  if (!response.ok) {
    console.log('response:', response)
    const errorData = await response.json()
    console.log('errorData:', errorData)
    throw new Error(errorData.message)
  }
  const data = await response.json()
  return data
}
