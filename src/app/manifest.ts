import { MetadataRoute } from 'next'
import { description, title } from './env'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: title,
    short_name: title,
    description: description,
    display: 'standalone',
    background_color: '#4c9cd9',
    theme_color: '#4c9cd9',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  }
}
