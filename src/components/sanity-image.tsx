import { urlForImage } from '@/sanity/lib/image'
import { SanityImageWithAlt } from '@/utils/types'
import { getImageDimensions } from '@sanity/asset-utils'
import Image, { ImageProps } from 'next/image'

const SanityImage = ({
  image,
}: { image: SanityImageWithAlt } & (ImageProps | {})) =>
  image ? (
    <Image
      key={image.toString()}
      src={urlForImage(image).url()}
      alt={image.alt}
      width={getImageDimensions(image).width}
      height={getImageDimensions(image).height}
      placeholder="blur"
      blurDataURL={urlForImage(image).width(24).height(24).blur(10).url()}
      sizes="(max-width: 768px) 100vw,
        (max-width: 1200px) 50vw,
        40vw"
    />
  ) : null

export default SanityImage
