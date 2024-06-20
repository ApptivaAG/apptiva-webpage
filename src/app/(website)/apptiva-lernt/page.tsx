import BlogPosts from '@/components/blog/blog-posts'
import { PageHeader } from '@/components/page-header'
import { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { Suspense } from 'react'

const url = '/apptiva-lernt'
const title = 'Apptiva lernt'
export const metadata: Metadata = {
  title,
  description:
    'Kleine (technische) Wissenshappen, die wir jede Woche neu dazu lernen.',
  alternates: { canonical: url },
  openGraph: {
    title,
    url,
  },
}

export default async function ApptivaLerntList({
  params,
}: {
  params: { slug: string }
}) {
  const { isEnabled } = draftMode()
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
            <BlogPosts show="apptiva-lernt" isDraft={isEnabled} />
          </Suspense>
        </div>
      </div>
    </>
  )
}
