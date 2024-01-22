import { urlForImage } from '@/sanity/lib/image'
import { getServicePages } from '@/utils/service-page'
import { PortableText } from '@portabletext/react'
import { getImageDimensions } from '@sanity/asset-utils'
import Image from 'next/image'

export default async function Home(props: { params: { slug: string } }) {
  const servicePages = await getServicePages()
  const servicePage = servicePages.get(props.params.slug)

  // Use the schema and the query as you see fit, for example:

  return (
    <>
      <h1
        style={{ fontSize: '30px', fontWeight: 'bold', paddingBottom: '1em' }}
      >
        {servicePage?.title}
      </h1>

      {servicePage?.modules?.map((module) => (
        <>
          <h2>{module.title}</h2>
          {module.image && (
            <Image
              key={module.image.toString()}
              src={urlForImage(module.image).url()}
              alt={module.imageAlt ?? ''}
              width={getImageDimensions(module.image).width}
              height={getImageDimensions(module.image).height}
              placeholder="blur"
              blurDataURL={urlForImage(module.image)
                .width(24)
                .height(24)
                .blur(10)
                .url()}
              sizes="
            (max-width: 768px) 100vw,
            (max-width: 1200px) 50vw,
            40vw"
            />
          )}
          {module.content?.map((content) => (
            <PortableText key={content._key} value={content} />
          ))}
        </>
      ))}
    </>
  )
}
