import { useState } from 'react'
import { useMyContext } from '../context/MyContext'

export default function useNavegation () {
  const { state: globalState, dispatch } = useMyContext()
  const {} = globalState

  function addPath () {

  }

  return {
    history,
    addPath
  }
}
