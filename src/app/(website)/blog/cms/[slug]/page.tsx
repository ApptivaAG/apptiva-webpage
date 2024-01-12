// ./nextjs-app/app/page.tsx

import { blogBySlugQuery } from '@/sanity/lib/queries'
import { sanityFetch, urlForImage } from '@/sanity/lib/sanityFetch'
import { getImageDimensions } from '@sanity/asset-utils'
import { SanityDocument } from 'next-sanity'
import Image from 'next/image'

export default async function Home(props: { params: { slug: string } }) {
  const blog = await sanityFetch<SanityDocument[]>({
    query: blogBySlugQuery(props.params.slug),
  })

  /*
  todo: add 
    header
    creation at *
    modified at *
    image

    image caption
    author (ref person)
    tags
  */

  return (
    <div className="container mx-auto px-4">
      <h1>Hoi {props.params.slug}</h1>
      {blog.map((b) => (
        <>
          <div>
            erstellt: {b._createdAt}, letzte änderung: {b._updatedAt}
          </div>
          <br />
          <div>{b.header.title}</div>
          <div>{b.header.description}</div>
          {b.header.image?.asset && (
            <>
              <p>todo: alt text image?</p>
              <p>alt: {b.header.imageAlt}</p>
              <Image
                key={b.header.image}
                src={urlForImage(b.header.image).url()}
                alt={b.header.imageAlt}
                width={getImageDimensions(b.header.image).width}
                height={getImageDimensions(b.header.image).height}
                placeholder="blur"
                blurDataURL={urlForImage(b.header.image)
                  .width(24)
                  .height(24)
                  .blur(10)
                  .url()}
                sizes="
            (max-width: 768px) 100vw,
            (max-width: 1200px) 50vw,
            40vw"
              />
            </>
          )}
        </>
      ))}
    </div>
  )
}
