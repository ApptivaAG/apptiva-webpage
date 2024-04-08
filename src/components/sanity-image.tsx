import { dataset, projectId } from '@/sanity/env'
import { urlForImage } from '@/sanity/lib/image'
import { SanityImageWithAlt } from '@/utils/types'
import {
  SanityImageSource,
  getImageAsset,
  getImageDimensions,
} from '@sanity/asset-utils'
import type { PlaceholderValue } from 'next/dist/shared/lib/get-img-props'
import Image from 'next/image'

export default function SanityImage({
  image,
  className,
  size,
  sizes,
}: {
  image: (SanityImageWithAlt & { asset?: any }) | null
  className?: string
  size?: 'content' | 'popout' | 'full' | 'default'
  sizes?: string
}) {
  if (!image) return null
  const { width = 0, height = 0 } = image?.asset
    ? getImageDimensions(image)
    : {}

  return image.asset ? (
    <Image
      className={className}
      key={image.toString()}
      src={urlForImage(image).url()}
      alt={image.alt}
      width={width}
      height={height}
      placeholder={buildPlaceholder(image, width, height)}
      sizes={getSizes(sizes, size)}
    />
  ) : null
}

function getSizes(sizes: string | undefined, size: string | undefined) {
  if (sizes) {
    return sizes
  }

  switch (size) {
    case 'content':
      return '(max-width: 1200px) 100vw, 70rem'

    case 'popout':
      return '(max-width: 1200px) 100vw, 74rem'

    case 'full':
      return '(max-width: 1200px) 100vw, 100vw'

    default:
      return '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw'
  }
}

function buildPlaceholder(
  image: SanityImageSource & {
    alt: string
  },
  width: number,
  height: number
): PlaceholderValue | undefined {
  const isTooSmallForBlur = width < 40 || height < 40

  if (isTooSmallForBlur) {
    return undefined
  }

  const asset = getImageAsset(image, { projectId: projectId, dataset: dataset })

  return (
    (asset.metadata.lqip as `data:image/${string}` | undefined) ??
    `data:image/svg+xml;base64,${toBase64(shimmer(width, height))}`
  )
}

const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#eee" offset="20%" />
      <stop stop-color="#ddd" offset="50%" />
      <stop stop-color="#eee" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#eee" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`

const toBase64 = (str: string) =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str)
