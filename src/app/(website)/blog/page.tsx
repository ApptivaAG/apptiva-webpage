import BlogPosts from '@/components/blog/blog-posts'
import { PageHeader } from '@/components/page-header'
import { Metadata } from 'next'
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

export default async function Home({ params }: { params: { slug: string } }) {
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
            <BlogPosts show="blog" />
          </Suspense>
        </div>
      </div>
    </>
  )
}
