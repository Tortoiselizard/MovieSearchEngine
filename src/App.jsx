import Home from './components/Home/Home'
import FullDataMovies from './components/FullDataMovies/FullDataMovies.jsx'

import { useMyContext } from './context/MyContext'

import './App.css'

export default function App () {
  const { state: globalState } = useMyContext()
  const { mode } = globalState

  return (
    <>
      {
      mode === 'home'
        ? (
          <Home />
          )
        : (
          <FullDataMovies />
          )
    }
    </>
  )
}
