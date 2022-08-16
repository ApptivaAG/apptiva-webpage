/* eslint-disable no-unused-expressions */
/* eslint-disable import/prefer-default-export */
import { useEffect, useState } from 'react'
import { isBrowser } from '../util'

export const useLocalStorage = (storageKey, fallbackState) => {
  const storedValue = isBrowser ? localStorage.getItem(storageKey) : null
  const [value, setValue] = useState(
    storedValue ? JSON.parse(storedValue) : fallbackState
  )

  useEffect(() => {
    isBrowser && localStorage.setItem(storageKey, JSON.stringify(value))
  }, [value, storageKey])

  return [value, setValue]
}
