import { useEffect } from 'react'
import useHistory from '../../hooks/useHistory'

export default function Redirect () {
  const { replaceLast } = useHistory()

  useEffect(() => {
    replaceLast('/notFound')
  }, [])
  return null
}
