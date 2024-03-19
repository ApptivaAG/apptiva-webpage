import { urlForImage } from '@/sanity/lib/image'
import { SanityImageWithAlt } from '@/utils/types'
import { getImageAsset, getImageDimensions } from '@sanity/asset-utils'
import Image from 'next/image'

const SanityImage = ({
  image,
  className,
}: {
  image: (SanityImageWithAlt & { asset?: any }) | null
  className?: string
}) => {
  const { width = 0, height = 0 } = image?.asset
    ? getImageDimensions(image)
    : {}

  return image?.asset ? (
    <Image
      className={className}
      key={image.toString()}
      src={urlForImage(image).url()}
      alt={image.alt}
      width={width}
      height={height}
      {...((width > 40 || height > 40) && { placeholder: 'blur' })}
      blurDataURL={getImageAsset(image).metadata.lqip}
      sizes="(max-width: 768px) 100vw,
        (max-width: 1200px) 50vw,
        40vw"
    />
  ) : null
}

export default SanityImage
