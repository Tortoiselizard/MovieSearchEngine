import { Link as LinkReactRouter } from 'react-router'
import useHistory from '../../hooks/useHistory'

export default function Link ({ children, to, ...props }) {
  const { updateLastURL, history } = useHistory()
  const { list, index } = history

  function updateScroll () {
    const scroll = window.scrollY
    updateLastURL(list[index].url, scroll)
  }

  return (
    <LinkReactRouter
      to={to}
      onClick={updateScroll}
      {...props}
    >
      {children}
    </LinkReactRouter>
  )
}
