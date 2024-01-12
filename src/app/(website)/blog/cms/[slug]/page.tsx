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
      {blog.map((b) => (
        <>
          <div>
            erstellt: {b._createdAt}
            <br />
            letzte änderung: {b._updatedAt}
          </div>
          <br />
          <h1>{b.header.title}</h1>
          <div>{b.header.description}</div>
          {b.header.image?.asset && (
            <>
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
              <p>alt: {b.header.imageAlt}</p>
              <br />
              <p>todo: alt text image?</p>
              <p>todo: sanity image component</p>
            </>
          )}
        </>
      ))}
    </div>
  )
}
