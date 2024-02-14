import Heading from '@/components/heading'
import { TagFilter } from '@/components/tag-filter'
import { getTags } from '@/utils/tags'
import BlogPosts from './blog-posts'
import { Suspense } from 'react'

export default async function Home({
  params,
  searchParams,
}: {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const tags = await getTags()

  return (
    <div className="space-y-4">
      <Heading level={2}>Blog</Heading>
      <TagFilter tags={tags} searchParams={searchParams}></TagFilter>
      <Suspense
        fallback={
          <p className="pb-64 pt-8 text-xl font-bold">Lade Blogposts...</p>
        }
      >
        <BlogPosts searchParams={searchParams} />
      </Suspense>
    </div>
  )
}
