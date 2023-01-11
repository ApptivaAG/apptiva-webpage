import striptags from 'striptags'

export const stripHTML = (content) =>
  striptags(content).replace(/&.{2,4};/gi, '')

export const truncate = (text, length) =>
  text.length > length ? `${text.slice(0, length)}...` : text

export const compose = (...fns) =>
  fns.reduce((f, g) => (...args) => f(g(...args)))

export const isBrowser = typeof window !== 'undefined'
