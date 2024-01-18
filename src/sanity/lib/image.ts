import createImageUrlBuilder from '@sanity/image-url'

import { SanityImageSource } from '@sanity/asset-utils'
import { dataset, projectId } from '../env'

const imageBuilder = createImageUrlBuilder({
  projectId: projectId || '',
  dataset: dataset || '',
})

export function urlForImage(source: SanityImageSource) {
  return imageBuilder.image(source)
}
