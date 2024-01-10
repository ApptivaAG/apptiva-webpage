import { getImageInfo } from '@/utils/blog'
import Image from 'next/image'
import path from 'path'

function MdxImage(contentPath: string) {
  return function MdxImageInline(props: {
    src?: string
    alt?: string
    title?: string
  }) {
    if (!props.src) {
      return null
    }

    const src = path.join(contentPath, props.src)
    const { height, width } = getImageInfo(src)
    return (
      <figure>
        <Image
          src={src}
          alt={props.alt ?? ''}
          width={width}
          height={height}
          sizes="(max-width: 1024px) 100vw, 1024px"
        />
        {props.title && <figcaption>{props.title}</figcaption>}
      </figure>
    )
  }
}

export default MdxImage
