import { useState } from 'react'
import usePromise from 'react-use-promise'

export const useAPI = (apiPromise, deps) => {
  const [triggerState, setTriggerState] = useState(false)
  const [result, error, state] = usePromise(apiPromise, [...deps, triggerState])

  function trigger () {
    setTriggerState(prev => !prev)
  }

  return { data: result, error, loading: state === 'pending', trigger }
}
