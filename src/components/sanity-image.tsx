import { dataset, projectId } from '@/sanity/env'
import { urlForImage } from '@/sanity/lib/image'
import { SanityImageWithAlt } from '@/utils/types'
import { getImageAsset, getImageDimensions } from '@sanity/asset-utils'
import Image from 'next/image'

const SanityImage = ({
  image,
  className,
  size,
  sizes,
}: {
  image: (SanityImageWithAlt & { asset?: any }) | null
  className?: string
  size?: 'content' | 'popout' | 'full' | 'default'
  sizes?: string
}) => {
  if (!image) return null
  const { width = 0, height = 0 } = image?.asset
    ? getImageDimensions(image)
    : {}

  const asset = getImageAsset(image, {
    projectId: projectId,
    dataset: dataset,
  })

  return image?.asset ? (
    <Image
      className={className}
      key={image.toString()}
      src={urlForImage(image).url()}
      alt={image.alt}
      width={width}
      height={height}
      {...(asset.metadata.lqip &&
        (width > 40 || height > 40) && { placeholder: 'blur' })}
      blurDataURL={asset.metadata.lqip}
      sizes={
        sizes
          ? sizes
          : size === 'content'
            ? '(max-width: 1200px) 100vw, 70rem'
            : size === 'popout'
              ? '(max-width: 1200px) 100vw, 74rem'
              : size === 'full'
                ? '(max-width: 1200px) 100vw, 100vw'
                : '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw'
      }
    />
  ) : null
}

export default SanityImage
