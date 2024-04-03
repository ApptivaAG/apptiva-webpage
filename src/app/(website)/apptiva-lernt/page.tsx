import BlogPosts from '@/components/blog/blog-posts'
import { PageHeader } from '@/components/page-header'
import { Suspense } from 'react'

export default async function ApptivaLerntList({
  params,
}: {
  params: { slug: string }
}) {
  return (
    <>
      <PageHeader
        title="Apptiva lernt"
        lead="Kleine (technische) Wissenshappen, die wir jede Woche neu dazu lernen."
        links={[{ name: 'Apptiva lernt', href: '/apptiva-lernt' }]}
      />
      <div className="full bg-primary">
        <div className="content ">
          <Suspense
            fallback={
              <p className="pb-64 pt-8 text-xl font-bold">Lade Artikel...</p>
            }
          >
            <BlogPosts show="apptiva-lernt" />
          </Suspense>
        </div>
      </div>
    </>
  )
}
