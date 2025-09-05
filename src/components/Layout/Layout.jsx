import { Outlet, useLocation } from 'react-router'
import Header from '../Header/Header'
import { Toaster } from 'react-hot-toast'

import { useEffect } from 'react'
import useHistory from '../../hooks/useHistory.js'

export default function Layout () {
  const { initialize, history, updateLastURL, addNewURL } = useHistory()
  const { list, index } = history
  const location = useLocation()
  const { pathname, search } = location

  // Initialize history navegation
  useEffect(() => {
    initialize()
  }, [])

  // Update history navegation
  useEffect(() => {
    if (!list.length) return
    const lastHistory = list[index]
    if (!lastHistory) return
    const { url, scroll } = lastHistory
    const condition = url.includes(pathname) ? 'update' : 'add'
    if (condition === 'update' && url === pathname + search) {
      window.scrollTo(0, scroll)
      return
    }
    switch (condition) {
      case 'update': {
        updateLastURL(pathname + search)
        break
      }
      case 'add': {
        addNewURL(pathname + search)
        window.scrollTo(0, 0)
        break
      }
    }
  }, [pathname, search])

  return (
    <>
      <Header />
      <Outlet />
      <Toaster
        position='bottom-left'
        toastOptions={{
          style: {
            background: 'rgba(0,0,0,0.75)',
            border: '1px solid white',
            color: 'white'
          }
        }}
      />
    </>
  )
}
