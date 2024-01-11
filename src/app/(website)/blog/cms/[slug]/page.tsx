// ./nextjs-app/app/page.tsx

import { blogBySlugQuery } from '@/sanity/lib/queries'
import { sanityFetch } from '@/sanity/lib/sanityFetch'
import { SanityDocument } from 'next-sanity'

export default async function Home(props: { params: { slug: string } }) {
const blog = await sanityFetch<SanityDocument[]>({ query: blogBySlugQuery(props.params.slug) })

  return (
    <div className="container mx-auto px-4">
      <h1>Hoi {props.params.slug}</h1>      
      {blog.length}      
    </div>
  )
}
