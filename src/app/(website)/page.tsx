// ./nextjs-app/app/page.tsx

import { SanityDocument } from 'next-sanity'
import { faqsQuery } from '@/sanity/lib/queries'
import { sanityFetch, token } from '@/sanity/lib/sanityFetch'
import { draftMode } from 'next/headers'
import Link from 'next/link'

export default async function Home() {
  return (
    <div className="container mx-auto px-4">
      <h1>Apptiva</h1>
      <ul>
        <li>
          <Link href="blog">Blog</Link>
        </li>
        <li>
          <Link href="faq">FAQ</Link>
        </li>
        <li>
          <Link href="studio">CMS</Link>
        </li>        
      </ul>
    </div>
  )
}
