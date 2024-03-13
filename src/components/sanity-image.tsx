import { urlForImage } from '@/sanity/lib/image'
import { SanityImageWithAlt } from '@/utils/types'
import { getImageAsset, getImageDimensions } from '@sanity/asset-utils'
import Image from 'next/image'

const SanityImage = ({
  image,
  className,
}: {
  image: SanityImageWithAlt
  className?: string
}) =>
  image ? (
    <Image
      className={className}
      key={image.toString()}
      src={urlForImage(image).url()}
      alt={image.alt}
      width={getImageDimensions(image).width}
      height={getImageDimensions(image).height}
      placeholder="blur"
      blurDataURL={getImageAsset(image).metadata.lqip}
      sizes="(max-width: 768px) 100vw,
        (max-width: 1200px) 50vw,
        40vw"
    />
  ) : null

export default SanityImage
