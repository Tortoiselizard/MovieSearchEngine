import { useMyContext } from '../context/MyContext.jsx'
import { useNavigate, useLocation } from 'react-router'
import { initializeHistory, addURLToHistory, updateLastURLToHistory } from '../context/actions.js'

export default function useHistory () {
  const { state: globalState, dispatch } = useMyContext()
  const { pathname } = useLocation()
  const { history } = globalState
  const { list, index } = history
  const navigate = useNavigate()

  function addNewURL (url, scroll = 0) {
    const newList = [...list, { url, scroll }]
    const newHistory = {
      list: newList,
      index: newList.length - 1
    }
    dispatch(addURLToHistory(newHistory))
  }

  function updateLastURL (url, scroll = 0) {
    const newList = [...list]
    newList.splice(index, 1, { url, scroll })
    const newHistory = {
      list: newList,
      index
    }
    dispatch(updateLastURLToHistory(newHistory))
  }

  function initialize () {
    const newList = [{ url: pathname, scroll: 0 }]
    const newHistory = {
      list: newList,
      index: 0
    }
    dispatch(initializeHistory(newHistory))
  }

  function goToPrevious () {
    const newList = [...list]
    newList.pop()
    const index = newList.length - 1
    const newHistory = {
      list: newList,
      index
    }
    dispatch(updateLastURLToHistory(newHistory))
    navigate(newList[index].url)
  }

  function replaceLast (url, scroll = 0) {
    const newList = [...list]
    newList.splice(index, 1, { url, scroll })
    const newHistory = {
      list: newList,
      index: newList.length - 1
    }
    dispatch(updateLastURLToHistory(newHistory))
    navigate(url, { replace: true })
  }

  return {
    history,
    addNewURL,
    goToPrevious,
    initialize,
    updateLastURL,
    replaceLast
  }
}
