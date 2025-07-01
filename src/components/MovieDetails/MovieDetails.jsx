import { useEffect } from 'react'
import { useParams } from 'react-router'

export default function MovieDetails () {
  const { id } = useParams()

  return (
    <p>Estoy en el detalle ({id})</p>
  )
}
