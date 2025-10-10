import BlogPosts from '@/components/blog/blog-posts'
import { PageHeader } from '@/components/page-header'
import { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { Suspense } from 'react'

const url = '/blog'
const title = 'Blog'
export const metadata: Metadata = {
  title,
  description: 'Aktuelles rund um die Apptiva',
  alternates: { canonical: url },
  openGraph: {
    title,
    url,
  },
}

export default async function Blog() {
  const { isEnabled } = await draftMode()
  return (
    <>
      <PageHeader
        title="Blog"
        lead="Aktuelles rund um die Apptiva"
        links={[{ name: 'Blog', href: '/blog' }]}
      />
      <div className="full bg-primary">
        <div className="content ">
          <Suspense
            fallback={
              <p className="pb-64 pt-8 text-xl font-bold">Lade Blogposts...</p>
            }
          >
            <BlogPosts show="blog" isDraft={isEnabled} />
          </Suspense>
        </div>
      </div>
    </>
  )
}
