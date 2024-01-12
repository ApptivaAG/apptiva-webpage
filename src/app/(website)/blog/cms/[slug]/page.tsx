// ./nextjs-app/app/page.tsx

import { blogBySlugQuery } from '@/sanity/lib/queries'
import { sanityFetch } from '@/sanity/lib/sanityFetch'
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

          {/*{b.image.asset._ref}<Image src={b.image.ref} alt={'tschese'}></Image>*/}
        </>
      ))}
    </div>
  )
}
