import { urlForImage } from '@/sanity/lib/image'
import { getServiceBySlug } from '@/utils/service-page'
import { PortableText } from '@portabletext/react'
import { getImageDimensions } from '@sanity/asset-utils'
import Image from 'next/image'
import { notFound } from 'next/navigation'

export default async function Home(props: { params: { slug: string } }) {
  const servicePage = (await getServiceBySlug(props.params.slug)) ?? notFound()

  // Use the schema and the query as you see fit, for example:

  return (
    <>
      <h1 className="text-3xl font-bold">{servicePage.title}</h1>

      <p>{servicePage.description}</p>
      {servicePage.image && (
        <Image
          key={servicePage.image.toString()}
          src={urlForImage(servicePage.image).url()}
          alt={servicePage.image.alt ?? ''}
          width={getImageDimensions(servicePage.image).width}
          height={getImageDimensions(servicePage.image).height}
          placeholder="blur"
          blurDataURL={urlForImage(servicePage.image)
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
      {servicePage.content?.map((content) => (
        <PortableText key={content._key} value={content} />
      ))}

      {servicePage.modules?.map((module) => (
        <>
          <h2>{module.title}</h2>
          {module.image && (
            <Image
              key={module.image.toString()}
              src={urlForImage(module.image).url()}
              alt={module.image.alt}
              width={getImageDimensions(module.image).width}
              height={getImageDimensions(module.image).height}
              placeholder="blur"
              blurDataURL={urlForImage(module.image)
                .width(24)
                .height(24)
                .blur(10)
                .url()}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
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
