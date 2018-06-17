import striptags from 'striptags'

export const stripHTML = content => striptags(content).replace(/&.{2,4};/gi, '')

export const dummy = ''
