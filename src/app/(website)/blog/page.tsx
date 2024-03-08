import { PageHeader } from '@/components/page-header'
import { Suspense } from 'react'
import BlogPosts from './blog-posts'

export default async function Home({ params }: { params: { slug: string } }) {
  return (
    <>
      <PageHeader title="Blog" lead="Aktuelles rund um die Apptiva" />
      <div className="full bg-primary">
        <div className="content ">
          <Suspense
            fallback={
              <p className="pb-64 pt-8 text-xl font-bold">Lade Blogposts...</p>
            }
          >
            <BlogPosts />
          </Suspense>
        </div>
      </div>
    </>
  )
}
