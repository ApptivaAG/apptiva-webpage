import Image from 'next/image'
import path from 'path'
import sharp from 'sharp'

function MdxImage(contentPath: string) {
  return async function MdxImageInline(props: {
    src?: string
    alt?: string
    title?: string
  }) {
    if (!props.src) {
      return null
    }

    const src = path.join(contentPath, props.src)
    const { height, width } = await getImageInfo(src)
    return (
      <figure className="feature">
        <Image
          src={src}
          alt={props.alt ?? ''}
          width={width}
          height={height}
          sizes="(max-width: 1200px) 1200px, 100vw"
        />
        {props.title && <figcaption>{props.title}</figcaption>}
      </figure>
    )
  }
}

export default MdxImage

async function getImageInfo(imageSrc: string) {
  try {
    const { height, width } = await sharp(
      path.join(process.cwd(), './public', imageSrc)
    ).metadata()

    if (height && width) {
      return { height, width }
    }
  } catch (error) {
    console.error('Error getting image size', error)
    console.error(
      'Tried to get image at',
      path.join(process.cwd(), './public', imageSrc)
    )
  }
  return { height: 100, width: 100 }
}
